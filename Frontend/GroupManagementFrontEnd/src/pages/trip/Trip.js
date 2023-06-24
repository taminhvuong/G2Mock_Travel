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
  CardHeader,
  CardText,
} from "reactstrap";
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { selectTrips, selectPage, selectSelectedRows, selectSize, selectTotalSize } from "../../redux/selectors/TripSelector";
import { connect } from "react-redux";
import { getListTripAction, updateSelectedRowsAction } from '../../redux/actions/TripAction';
import TripApi from '../../api/TripApi';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import CustomSearch from "./CustomSearch";
import * as Icon from 'react-feather';
import CustomFilter from "./CustomFilter";
import { useNavigate } from 'react-router-dom';
import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import { toastr } from "react-redux-toastr";
//import TableTrip from "./TableTrip";
const Trip = (props) => {

  const getListTrip = props.getListTripAction;
  const size = props.size;
  let onTotalMemberFilter;

  useEffect(() => {
    const getAllTrip = async () => {
      const result = await TripApi.getAll(1, size);
      const trips = result.content;
      const totalSize = result.totalElements;
      getListTrip(trips, 1, totalSize);
    }
    getAllTrip();
  }, [getListTrip, size]);
  // const navigator = useNavigate();


  const actionFormatterWatch = (cell, row, rowIndex) => {

    return (
      <Button size={16} className="" onClick={() => props.history.push(`/detailTrip/${row.codeTrip}`)}>Detail</Button>
    );
  };
  const actionFormatter = (cell, row, rowIndex) => {

    return (
      <Icon.Edit2 size={16} className="align-middle mr-2" onClick={() => updateTrip(row.codeTrip)} />
    );
  };

  const tableColumns = [
    {
      dataField: "codeTrip",
      text: "CodeTrip",
      sort: true
    },
    {
      dataField: "codeTour",
      text: "CodeTour",
      sort: true
    },

    {
      dataField: "destinationTour",
      text: "Destination",
      sort: true
    },
    {
      dataField: "endDate",
      text: "End_date",
      sort: true
    },
    {
      dataField: "startDate",
      text: "Start_date",
      sort: true
    },
    {
      dataField: "numberOfPassengers",
      text: "Number Of Passengers",
      sort: true
    },
    {
      dataField: "priceAdult",
      text: "Price Adult (đ)",
      sort: true
    },
    {
      dataField: "priceChildren",
      text: "Price Children (đ)",
      sort: true
    },
    {
      dataField: "surcharge",
      text: "Surcharge(đ)",
      sort: true
    },
    {
      dataField: "nameGuide",
      text: "Name Guide",
      sort: true
    },
    {
      dataField: "phoneGuide",
      text: "Phone Guide",
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
    },
    {
      dataField: "chitiet",
      text: "",
      formatter: actionFormatterWatch,
      headerStyle: (colum, colIndex) => {
        return { width: '80px' };
      },
      align: () => {
        return 'center';
      },
    }
  ];

  const handleTableChange = async (type, { page, sortField, sortOrder, searchText, filters }) => {
    // sort
    if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
      sortField = 'codeTrip'
      sortOrder = 'desc';
    }

    // filter
    const filter = filters && filters.totalMember && filters.totalMember.filterVal ? filters.totalMember.filterVal : null;
    const minTotalMember = filter && filter.minTotalMember ? filter.minTotalMember : null;
    const maxTotalMember = filter && filter.maxTotalMember ? filter.maxTotalMember : null;

    const result = await TripApi.getAll(page, size, sortField, sortOrder, searchText, minTotalMember, maxTotalMember);
    const trips = result.content;
    const totalSize = result.totalElements;
    getListTrip(trips, page, totalSize, minTotalMember, maxTotalMember, searchText);
  }

  // filter
  const [isVisiableFilter, setVisiableFilter] = useState(false);

  const handleChangeFilter = (minTotalMember, maxTotalMember) => {
    onTotalMemberFilter({
      minTotalMember,
      maxTotalMember
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
  const [tripUpdateInfo, setTripUpdateInfo] = useState();

  const updateTrip = async (codeTrip) => {
    setOpenModalUpdate(true);
    const tripInfo = await TripApi.getById(codeTrip);
    setTripUpdateInfo(tripInfo);
  }

  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);

  // delete
  const handleOnSelect = (row, isSelect) => {

    let selected = props.selectedRows;

    if (isSelect) {
      selected = [...props.selectedRows, row.codeTrip]
    } else {
      selected = props.selectedRows.filter(x => x !== row.codeTrip)
    }

    props.updateSelectedRowsAction(selected);
  }

  const handleOnSelectAll = (isSelect, rows) => {

    let selected = props.selectedRows;

    const ids = rows.map(r => r.codeTrip);
    if (isSelect) {
      selected = ids
    } else {
      selected = []
    }

    props.updateSelectedRowsAction(selected);
  }

  const deleteTrip = async () => {
    let answer = window.confirm(`Bạn có chắc muốn Xóa: ${props.selectedRows}`)
    if (answer) {
      if (props.selectedRows.length !== 0) {
        try {
          await TripApi.deleteByIds(props.selectedRows);
          showSuccessNotification(
            "Delete Trip",
            "Delete Trip Successfully!");
          refreshForm();
        } catch (error) {
          console.log(error);
          // redirect page error server
          props.history.push("/auth/500");
        }
      } else {
        showErrorNotification(
          "Delete Trip",
          "You must select trips"
        );
      }
    }
    else
      return;

  }

  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Trip Management</h1>
      {/* <TableTrip trips={props.trips} tableColumns={tableColumns} >

      </TableTrip> */}

      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="codeTrip"
                data={props.trips}
                columns={tableColumns}
                search>
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
                            <Icon.Trash2 className="align-middle mr-2" size={24} onClick={deleteTrip} />
                          </div>
                        </Col>
                      </Row>
                      {/* <Row


                        data={props.trips}>
                        <h1 className="h3 mb-3 text-center">Danh sách tour du lịch</h1>
                        {props.trips.map((row, index) => {

                          return (
                            <Col lg="4" >
                              <Card >
                                <CardHeader>
                                  { <UncontrolledCarousel
                                        className="carousel-fade"
                                        items={slides}
                                        indicators={true}
                                        controls={true}
                                    /> }
                                </CardHeader>
                                <CardBody className="pt-0">
                                  <CardText>Thời gian: <b>{row.startDate} đến {row.endDate}</b></CardText>
                                  <p className="h3">{row.destinationTour}</p>


                                  <CardText>Mã Tour:<b>{row.codeTour}</b>   </CardText>
                                  <CardText>Nơi khởi hành:  <b>{row.startingGateTour} </b></CardText>
                                  <p className="h4 text-danger">{row.priceAdult}đ</p>
                                  <Button>
                                    Chi tiết
                                  </Button>
                                  <CardText className="text-right">Số chỗ còn nhận:<b className="h4 text-danger">{row.numberOfPassengers}</b> </CardText>

                                </CardBody>
                              </Card>
                            </Col>
                          );
                        })}


                      </Row> */}
                      <BootstrapTable
                        {...toolkitprops.baseProps}
                        bootstrap4
                        striped
                        hover
                        bordered
                        remote

                        //paging 
                        pagination={paginationFactory({
                          page: props.page,
                          sizePerPage: props.size,
                          totalSize: props.totalSize,

                          withFirstAndLast: false,
                          alwaysShowAllBtns: true,

                          hideSizePerPage: true,
                        })}
                        //filter sort
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
              codeTrip: '',
              endDate: '',
              startDate: '',
              numberOfPassengers: '',
              priceAdult: '',
              nameGuide:'',
              phoneGuide:'',
              surcharge: ''
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
              .integer('Must be greater than or equal 0 and integer'),
              codeTrip: Yup.string()
                .min(6, 'Must be between 6 and 50 characters')
                .max(50, 'Must be between 6 and 50 characters')
                .required('Required')
                .test('checkUniqueName', 'This name is already registered.', async codeTrip => {
                  // call api
                  const isExists = await TripApi.existsByName(codeTrip);
                  return !isExists;
                }),
            })
          }

          onSubmit={
            async values => {
              try {
                await TripApi.create(

                  values.codeTrip,
                  values.endDate,
                  values.startDate,

                  values.numberOfPassengers,
                  values.priceAdult,
                  values.surcharge,
                  values.nameGuide,

                  values.phoneGuide,
                  values.codeTour);
                // show notification
                showSuccessNotification(
                  "Create Trip",
                  "Create Trip Successfully!"
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
              <ModalHeader>Create Trip</ModalHeader>

              {/* body */}
              <ModalBody className="m-3">

                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Code Trip:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="codeTrip"
                      placeholder="Enter trip codeTrip"
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
                    <label>Name Guide:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="nameGuide"
                      placeholder="Enter code tour"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Phone Guide:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="phoneGuide"
                      placeholder="Enter code tour"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Name Guide:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="nameGuide"
                      placeholder="Enter code tour"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Phone Guide:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="phoneGuide"
                      placeholder="Enter code tour"
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
              startDate: tripUpdateInfo && tripUpdateInfo.startDate !== undefined && tripUpdateInfo.startDate !== null ? tripUpdateInfo.startDate : '',
              priceAdult: tripUpdateInfo && tripUpdateInfo.priceAdult !== undefined && tripUpdateInfo.priceAdult !== null ? tripUpdateInfo.priceAdult : '',
              numberOfPassengers: tripUpdateInfo && tripUpdateInfo.numberOfPassengers !== undefined && tripUpdateInfo.numberOfPassengers !== null ? tripUpdateInfo.numberOfPassengers : '',
              surcharge: tripUpdateInfo && tripUpdateInfo.surcharge !== undefined && tripUpdateInfo.surcharge !== null ? tripUpdateInfo.surcharge : '',
              nameGuide: tripUpdateInfo && tripUpdateInfo.nameGuide !== undefined && tripUpdateInfo.nameGuide !== null ? tripUpdateInfo.nameGuide : '',
              phoneGuide: tripUpdateInfo && tripUpdateInfo.phoneGuide !== undefined && tripUpdateInfo.phoneGuide !== null ? tripUpdateInfo.phoneGuide : '',

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
                await TripApi.update(
                  tripUpdateInfo.codeTrip,
                  values.endDate,
                  values.startDate,
                  values.numberOfPassengers,
                  values.priceAdult,
                  values.surcharge,
                  values.nameGuide,
                  values.phoneGuide,
                  values.codeTour,

                );
                // show notification
                showSuccessNotification(
                  "Update Trip",
                  "Update Trip Successfully!"
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
              <ModalHeader>Update Trip</ModalHeader>

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
                    <label>Name Guide:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="nameGuide"
                      placeholder="Enter code tour"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Phone Guide:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="phoneGuide"
                      placeholder="Enter code tour"
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
    trips: selectTrips(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state),
    selectedRows: selectSelectedRows(state)
  };
};

export default connect(mapGlobalStateToProps, { getListTripAction, updateSelectedRowsAction })(Trip);