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
import CKEditor from "./Ckeditor";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { selectTours, selectPage, selectSelectedRows, selectSize, selectTotalSize } from "../../redux/selectors/TourSelector";
import { connect } from "react-redux";
import { getListTourAction, updateSelectedRowsAction } from '../../redux/actions/TourActions';
import TourApi from '../../api/TourApi';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import CustomSearch from "./CustomSearch";
import * as Icon from 'react-feather';
// import CustomFilter from "./CustomFilter";
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
      const tours = result.content;
      const totalSize = result.totalElements;
      getListTour(tours, 1, totalSize);
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
  const [dataCKeditor, setDataCKeditor] = useState("");

  const handleTableChange = async (type, { page, sortField, sortOrder, searchText }) => {
    // sort
    if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
      sortField = 'codeTour'
      sortOrder = 'desc';
    }

    // filter


    const result = await TourApi.getAll(page, size, sortField, sortOrder, searchText);
    const tours = result.content;
    const totalSize = result.totalElements;
    getListTour(tours, page, totalSize, searchText);
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
  const [tourUpdateInfo, setTourUpdateInfo] = useState();

  const updateTour = async (codeTour) => {
    setOpenModalUpdate(true);
    const tourInfo = await TourApi.getById(codeTour);
    setTourUpdateInfo(tourInfo);
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
    if (answer) {
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
          "You must select tours"
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
                data={props.tours}
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
                            {/* <CustomFilter handleChangeFilter={handleChangeFilter} /> */}
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
              codeTour: "",
              description: "",
              destination: "",

              startingGate: "",
              tourTime: "",
              vehicle: "",

            }
          }
          validationSchema={
            Yup.object({
              codeTour: Yup.string()
                .min(6, 'Must be between 6 and 50 characters')
                .max(50, 'Must be between 6 and 50 characters')
                .required('Required')
              // .test('checkUniqueName', 'This name is already registered.', async codeTour => {
              //   // call api
              //   const isExists = await TourApi.existsByName(codeTour);
              //   return !isExists;
              // })
              ,
            })
          }

          onSubmit={
            async values => {
              try {
                await TourApi.create(

                  values.codeTour,
                  dataCKeditor,
                  values.destination,

                  values.startingGate,
                  values.tourTime,
                  values.vehicle,);
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
                    <label>Mã Tour:</label>
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
                    <label>Mô tả lịch trình:</label>
                  </Col>
                  <Col>
                    <CKEditor dataCKeditor={dataCKeditor} setDataCKeditor={setDataCKeditor} ></CKEditor>

                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Lộ trình:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="destination"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Nơi khởi hành:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="startingGate"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Thời giant:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="number"
                      bsSize="lg"
                      name="tourTime"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Phương tiện:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="vehicle"
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
              // codeTour: "",
              // description: "",
              // destination: "",

              // startingGate: "",
              // tourTime: "",
              // vehicle: "",

              codeTour: tourUpdateInfo && tourUpdateInfo.codeTour !== undefined && tourUpdateInfo.codeTour !== null ? tourUpdateInfo.codeTour : '', 
              description: tourUpdateInfo && tourUpdateInfo.description !== undefined && tourUpdateInfo.description !== null ? tourUpdateInfo.description : '',
              destination: tourUpdateInfo && tourUpdateInfo.destination !== undefined && tourUpdateInfo.destination !== null ? tourUpdateInfo.destination : '',
              startingGate: tourUpdateInfo && tourUpdateInfo.startingGate !== undefined && tourUpdateInfo.startingGate !== null ? tourUpdateInfo.startingGate : '',
              tourTime: tourUpdateInfo && tourUpdateInfo.tourTime !== undefined && tourUpdateInfo.tourTime !== null ? tourUpdateInfo.tourTime : '',
              vehicle: tourUpdateInfo && tourUpdateInfo.vehicle !== undefined && tourUpdateInfo.vehicle !== null ? tourUpdateInfo.vehicle : '',

            }
          }
          validationSchema={
            Yup.object({

              tourTime: Yup.number()
                .min(0, 'Must be greater than or equal 0 and integer')
                .integer('Must be greater than or equal 0 and integer'),
              // priceAdult: Yup.number()
              //   .min(0, 'Must be greater than or equal 0 and integer')
              //   .integer('Must be greater than or equal 0 and integer'),
              // surcharge: Yup.number()
              //   .min(0, 'Must be greater than or equal 0 and integer')
              //   .integer('Must be greater than or equal 0 and integer')
            })
          }

          onSubmit={
            async values => {
              try {
                await TourApi.update(
                  tourUpdateInfo.codeTour,
                  dataCKeditor,
                  values.destination,

                  values.startingGate,
                  values.tourTime,
                  values.vehicle,
                );
                // show notification
                showSuccessNotification(
                  "Update Tour",
                  "Update Tour Successfully!"
                );
                // close modal
                setOpenModalUpdate(false);
                // Refresh table
                setDataCKeditor("")
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
                    <label>Mã Tour:</label>
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
                    <label>Mô tả lịch trình:</label>
                  </Col>
                  <Col>
                    <CKEditor dataCKeditor={dataCKeditor} setDataCKeditor={setDataCKeditor} ></CKEditor>

                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Lộ trình:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="destination"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Nơi khởi hành:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="startingGate"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Thời giant:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="number"
                      bsSize="lg"
                      name="tourTime"
                      placeholder="Enter total member"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Phương tiện:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="vehicle"
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

                <Button color="primary" onClick={() =>{ setOpenModalUpdate(false);setDataCKeditor("")}}>
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
    tours: selectTours(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state),
    selectedRows: selectSelectedRows(state)
  };
};

export default connect(mapGlobalStateToProps, { getListTourAction, updateSelectedRowsAction })(Tour);