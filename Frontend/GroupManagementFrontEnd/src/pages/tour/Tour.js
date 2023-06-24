import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { selectTours, selectPage, selectSelectedRows, selectSize, selectTotalSize } from "../../redux/selectors/TourSelector";
import { connect } from "react-redux";
import { getListTourAction, updateSelectedRowsAction } from '../../redux/actions/TourActions';
import TourApi from '../../api/TourApi';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import CustomSearch from "./CustomSearch";
import * as Icon from 'react-feather';
import CustomFilter from "./CustomFilter";
import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import { toastr } from "react-redux-toastr";

const Tour = (props) => {

  const getListTour = props.getListTourAction;
  const size = props.size;
  let onTotalMemberFilter;

  useEffect(() => {
    const getAllTour = async () => {
      const result = await TourApi.getAll(1, size);
      const trips = result.content;
      const totalSize = result.totalElements;
      getListTour(trips, 1, totalSize);
    }
    getAllTour();
  }, [getListTour, size]);

  const actionFormatter = (cell, row, rowIndex) => {

    return (
      <Icon.Edit2 size={16} className="align-middle mr-2" onClick={() => updateTour(row.codeTour)} />
    );
  };

  const tableColumns = [
    {
      dataField: "codeTour",
      text: "CodeTour",
      sort: true
    },
   

    {
      dataField: "destination",
      text: "Destination",
      sort: true
    },
    {
      dataField: "startingGate",
      text: "Starting Gate",
      sort: true
    },
    {
      dataField: "vehicle",
      text: "Vehicle",
      sort: true
    },
    // {
    //   dataField: "description",
    //   text: "Description",
    //   sort: true
    // },
    {
        dataField: "tourTime",
        text: "Tour Time (Day)",
        sort: true
      },
      {
        dataField: "img",
        text: "Image",
        sort: true
      },

    {
      dataField: "action",
      text: "Action",
      formatter: actionFormatter,
      headerStyle: (colum, colIndex) => {
        return { width: '80px' };
      },
      align: () => {
        return 'center';
      },
    }
  ];

  const handleTableChange = async (type, { page, sortField, sortOrder, searchText }) => {
    // sort
    if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
      sortField = 'codeTour'
      sortOrder = 'desc';
    }

    // filter
   

    const result = await TourApi.getAll(page, size, sortField, sortOrder, searchText);
    const trips = result.content;
    const totalSize = result.totalElements;
    getListTour(trips, page, totalSize, searchText);
  }

  // filter
  const [isVisiableFilter, setVisiableFilter] = useState(false);

  const handleChangeFilter = () => {
    onTotalMemberFilter({
    
    });
  }

  // refresh form
  const refreshForm = () => {
    // refresh selected rows
    props.updateSelectedRowsAction([]);

    handleTableChange(null,
      {
        page: 1,
        sortField: null,
        sortOrder: null,
        searchText: null,
        filters: null
      }
    );
  }

  // create
  const [isOpenModalCreate, setOpenModalCreate] = useState(false);

  const showSuccessNotification = (title, message) => {
    const options = {
      timeOut: 3000,
      showCloseButton: false,
      progressBar: false,
      position: "top-right"
    };

    // show notification
    toastr.success(title, message, options);
  }

  const showErrorNotification = (title, message) => {
    const options = {
      timeOut: 3000,
      showCloseButton: false,
      progressBar: false,
      position: "top-right"
    };

    // show notification
    toastr.error(title, message, options);
  }
  // update trip
  const [tripUpdateInfo, setTourUpdateInfo] = useState();

  const updateTour = async (codeTour) => {
    setOpenModalUpdate(true);
    const tripInfo = await TourApi.getById(codeTour);
    setTourUpdateInfo(tripInfo);
  }

  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);

  // delete
  const handleOnSelect = (row, isSelect) => {

    let selected = props.selectedRows;

    if (isSelect) {
      selected = [...props.selectedRows, row.codeTour]
    } else {
      selected = props.selectedRows.filter(x => x !== row.codeTour)
    }

    props.updateSelectedRowsAction(selected);
  }

  const handleOnSelectAll = (isSelect, rows) => {

    let selected = props.selectedRows;

    const ids = rows.map(r => r.codeTour);
    if (isSelect) {
      selected = ids
    } else {
      selected = []
    }

    props.updateSelectedRowsAction(selected);
  }

  const deleteTour = async () => {
    let answer = window.confirm(`Bạn có chắc muốn Xóa: ${props.selectedRows}`)
    if(answer){
      if (props.selectedRows.length !== 0) {
        try {
          await TourApi.deleteByIds(props.selectedRows);
          showSuccessNotification(
            "Delete Tour",
            "Delete Tour Successfully!");
          refreshForm();
        } catch (error) {
          console.log(error);
          // redirect page error server
          props.history.push("/auth/500");
        }
      } else {
        showErrorNotification(
          "Delete Tour",
          "You must select trips"
        );
      }
    }
    else
    return;
   
  }

  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Tour Management</h1>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="codeTour"
                data={props.trips}
                columns={tableColumns}
                search
              >
                {
                  toolkitprops => (
                    <>
                      {/* Filter */}
                      {isVisiableFilter &&
                        <Row>
                          <Col lg="12">
                            <CustomFilter handleChangeFilter={handleChangeFilter} />
                          </Col>
                        </Row>
                      }
                      {/* Search */}
                      <Row style={{ alignItems: "center" }}>
                        <Col lg="3">
                          <CustomSearch {...toolkitprops.searchProps} />
                        </Col>
                        <Col lg="9">
                          <div className="float-right pull-right">
                            <Icon.Filter size={24} className="align-middle mr-2" onClick={() => setVisiableFilter(!isVisiableFilter)} />
                            <Icon.RefreshCcw className="align-middle mr-2" size={24} onClick={refreshForm} />
                            <Icon.PlusCircle className="align-middle mr-2" size={24} onClick={() => setOpenModalCreate(true)} />
                            <Icon.Trash2 className="align-middle mr-2" size={24} onClick={deleteTour} />
                          </div>
                        </Col>
                      </Row>
                      <BootstrapTable
                        {...toolkitprops.baseProps}
                        bootstrap4
                        striped
                        hover
                        bordered
                        remote
                        pagination={paginationFactory({
                          page: props.page,
                          sizePerPage: props.size,
                          totalSize: props.totalSize,

                          withFirstAndLast: false,
                          alwaysShowAllBtns: true,

                          hideSizePerPage: true,
                        })}
                        filter={filterFactory()}
                        selectRow={{
                          mode: 'checkbox',
                          clickToSelect: true,
                          selected: props.selectedRows,
                          onSelect: handleOnSelect,
                          onSelectAll: handleOnSelectAll
                        }}
                        onTableChange={handleTableChange}
                      />
                    </>
                  )
                }
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={isOpenModalCreate}>
        <Formik
          initialValues={
            {
              codeTour: '',
              endDate: '',
              startDate: '',
              numberOfPassengers: '',
              priceAdult: '',
              
              surcharge: ''
            }
          }
          validationSchema={
            Yup.object({
              codeTour: Yup.string()
                .min(6, 'Must be between 6 and 50 characters')
                .max(50, 'Must be between 6 and 50 characters')
                .required('Required')
                .test('checkUniqueName', 'This name is already registered.', async codeTour => {
                  // call api
                  const isExists = await TourApi.existsByName(codeTour);
                  return !isExists;
                }),
            })
          }

          onSubmit={
            async values => {
              try {
                await TourApi.create(

                  values.codeTour,
                  values.endDate,
                  values.startDate,
                 
                  values.numberOfPassengers,
                  values.priceAdult,
                  values.surcharge,
                  values.codeTour);
                // show notification
                showSuccessNotification(
                  "Create Tour",
                  "Create Tour Successfully!"
                );
                // close modal
                setOpenModalCreate(false);
                // Refresh table
                refreshForm();
              } catch (error) {
                console.log(error);
                setOpenModalCreate(false);
                // redirect page error server
                props.history.push("/auth/500");
              }
            }
          }

          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* header */}
              <ModalHeader>Create Tour</ModalHeader>

              {/* body */}
              <ModalBody className="m-3">

                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Code Tour:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="codeTour"
                      placeholder="Enter trip codeTour"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Start Date:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="date"
                      bsSize="lg"
                      name="startDate"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>End Date:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="date"
                      bsSize="lg"
                      name="endDate"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>NumberOfPassengersr:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="number"
                      bsSize="lg"
                      name="numberOfPassengers"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Price Adult:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="number"
                      bsSize="lg"
                      name="priceAdult"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Surcharge:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="number"
                      bsSize="lg"
                      name="surcharge"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Code Tour:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="codeTour"
                      placeholder="Enter code tour"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
              </ModalBody>

              {/* footer */}
              <ModalFooter>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Save
                </Button>{" "}

                <Button color="primary" onClick={() => setOpenModalCreate(false)}>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik >
      </Modal>

      <Modal isOpen={isOpenModalUpdate}>
        <Formik
          enableReinitialize
          initialValues={
            {

              endDate: tripUpdateInfo && tripUpdateInfo.endDate !== undefined && tripUpdateInfo.endDate !== null ? tripUpdateInfo.endDate : '',
          //  endDate:'',  
          startDate:tripUpdateInfo && tripUpdateInfo.startDate !== undefined && tripUpdateInfo.startDate !== null ? tripUpdateInfo.startDate : '',
              priceAdult: tripUpdateInfo && tripUpdateInfo.priceAdult !== undefined && tripUpdateInfo.priceAdult !== null ? tripUpdateInfo.priceAdult : '',
              numberOfPassengers: tripUpdateInfo && tripUpdateInfo.numberOfPassengers !== undefined && tripUpdateInfo.numberOfPassengers !== null ? tripUpdateInfo.numberOfPassengers : '',
              surcharge: tripUpdateInfo && tripUpdateInfo.surcharge !== undefined && tripUpdateInfo.surcharge !== null ? tripUpdateInfo.surcharge : '',
              codeTour: tripUpdateInfo && tripUpdateInfo.codeTour !== undefined && tripUpdateInfo.codeTour !== null ? tripUpdateInfo.codeTour : '',

            }
          }
          validationSchema={
            Yup.object({
             
              numberOfPassengers: Yup.number()
                .min(0, 'Must be greater than or equal 0 and integer')
                .integer('Must be greater than or equal 0 and integer'),
              priceAdult: Yup.number()
                .min(0, 'Must be greater than or equal 0 and integer')
                .integer('Must be greater than or equal 0 and integer'),
              surcharge: Yup.number()
                .min(0, 'Must be greater than or equal 0 and integer')
                .integer('Must be greater than or equal 0 and integer')
            })
          }

          onSubmit={
            async values => {
              try {
                await TourApi.update(
                  tripUpdateInfo.codeTour,
                  values.endDate,
                  values.startDate,
                  values.numberOfPassengers,
                  values.priceAdult,
                  values.surcharge,
                  values.codeTour,

                );
                // show notification
                showSuccessNotification(
                  "Update Tour",
                  "Update Tour Successfully!"
                );
                // close modal
                setOpenModalUpdate(false);
                // Refresh table
                refreshForm();
              } catch (error) {
                console.log(error);
                setOpenModalUpdate(false);
                // redirect page error server
                props.history.push("/auth/500");
              }
            }
          }

          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* header */}
              <ModalHeader>Update Tour</ModalHeader>

              {/* body */}
              <ModalBody className="m-3">



                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Start_date:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="date"
                      bsSize="lg"
                      name="startDate"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>End_date:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="date"
                      bsSize="lg"
                      name="endDate"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>numberOfPassengers:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="number"
                      bsSize="lg"
                      name="numberOfPassengers"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>priceAdult:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="number"
                      bsSize="lg"
                      name="priceAdult"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Surcharge:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="number"
                      bsSize="lg"
                      name="surcharge"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Code Tour:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="codeTour"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
              </ModalBody>

              {/* footer */}
              <ModalFooter>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Save
                </Button>{" "}

                <Button color="primary" onClick={() => setOpenModalUpdate(false)}>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik >
      </Modal>

    </Container>
  )
};

const mapGlobalStateToProps = state => {
  return {
    trips: selectTours(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state),
    selectedRows: selectSelectedRows(state)
  };
};

export default connect(mapGlobalStateToProps, { getListTourAction, updateSelectedRowsAction })(Tour);