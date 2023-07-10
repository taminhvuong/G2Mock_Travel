import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
 
  CardTitle,
  Col,
  CardFooter,
 
  Button,
  Container,
  Row,
} from "reactstrap";
import * as Yup from 'yup';
import storage from '../../Storage/Storage';
import {
  
  Calendar,
 
  UserPlus,

  Bell as Bellicon,
  BookOpen as BookOpenIcon,
} from "react-feather";
import '../trip/DetailTrip.css'
import { FastField, Field, Form, Formik } from "formik";
import { ReactstrapInput  } from "reactstrap-formik";
import { useParams } from 'react-router-dom';
import TripApi from '../../api/TripApi';
import { toastr } from "react-redux-toastr";

import BookingApi from '../../api/BookingApi';


export default function Booking(props) {
  const { codeTrip } = useParams()

  const [tripByCodeTrio, setTripByCodeTrio] = React.useState(
    {
    }
  );

  React.useEffect(() => {

    getTripByCode(codeTrip)

    console.log(props.tripByCode)


  }, [codeTrip]);
  const getTripByCode = React.useCallback(async (codeTrip) => {
    let res = await TripApi.getById(codeTrip);
    setTripByCodeTrio(res)

    console.log(res)
  }, [])
  const [listValueInput, setListValueInput] = React.useState(
    {
      inputNumberAdult: '',
      inputNumberChildren: '',
    }
  )
  const handleChange = (e) => {
    setListValueInput({ ...listValueInput, inputNumberAdult: e.target.value })

  }
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

  // const CustomInputComponent = ({
  //   field,
  //   handleChange,// { name, value, onChange, onBlur }
  //   form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  //   ...props
  // }) => (
  //   <div>
  //     <input type="text" {...field} {...props} onChange={handleChange} />
  //     {touched[field.name] &&
  //       errors[field.name] && <div className="error">{errors[field.name]}</div>}
  //   </div>
  // );
  const CustomInputComponent = ({ field, form, handleChange, ...rest }) =>
    <div>
      <input {...field} onChange={handleChange} {...rest} />
      {form.errors[field.name] &&
        form.touched[field.name] &&
        <div>
          {form.errors[field.name]}
        </div>}
    </div>;

  return (
    <>
      <Container>
        <Row className="rowInoTrip flex-center">
          <Col lg="4" className="flex-center" >
            <img src="https://media.travel.com.vn/tour/tfd_230420052439_028008.jpg" className="img-fluid" alt="image" />

          </Col>
          <Col lg="8" className="flex-center">
            <Card className="my-0 p-3 font-weight-bolder">
              <h2>{tripByCodeTrio.destinationTour} ({tripByCodeTrio.hotel})</h2>
              <CardText>Khởi hành: {tripByCodeTrio.startDate}</CardText>
              <CardText>Thời gian: {tripByCodeTrio.timeTour} ngày</CardText>
              <CardText>Nơi khởi hành: {tripByCodeTrio.startingGateTour}</CardText>
              <CardText>Số chỗ còn nhận:{tripByCodeTrio.numberOfPassengers}</CardText>
              <CardText>Dịch vụ nghỉ:{tripByCodeTrio.hotel}</CardText>
            </Card>
          </Col>

        </Row>
        <Row className="rowInoBooking mt-4">
          <Formik

            enableReinitialize
            initialValues={
              {
                fullName:'',
                phone:'',
                email:'',
                destination:'',
                address:'',
                numberAdult:'',
                numberChildren:'',
                // totalPrice:'',
                nameUser:'',
                codeTrip:'',
               
              }
            }
            validationSchema={
              Yup.object({

                numberAdult: Yup.number()
                  .min(0, 'Must be greater than or equal 0 and integer')
                  .max(tripByCodeTrio.numberOfPassengers, 'vượt quá')
                  .integer('Must be greater than or equal 0 and integer')
                  .required('Required'),
                numberChildren: Yup.number()
                  .min(0, 'Must be greater than or equal 0 and integer')
                  .integer('Must be greater than or equal 0 and integer')
                  .required('Required'),
                fullName: Yup.string()
                  .min(6, 'Must be between 6 and 50 characters')
                  .max(50, 'Must be between 6 and 50 characters')
                  .required('Required'),
                address: Yup.string()
                  .required('Required'),
                email: Yup.string()
                  .min(6, 'Must be between 6 and 50 characters')
                  .max(50, 'Must be between 6 and 50 characters')
                  .required('Required'),
                phone: Yup.string()
                  .min(10, 'Must be 10 characters')
                  .max(10, 'Must be 10 characters')
                  .required('Required'),

              })

            }

            onSubmit={
              async values => {
                try {
                  await BookingApi.create(

                    values.fullName,
                    values.phone,
                    
                    values.email,
                    tripByCodeTrio.destinationTour,
                    values.address,
                    values.numberAdult,
                    values.numberChildren,
                    // tripByCodeTrio.priceAdult * values.numberAdult + tripByCodeTrio.priceChildren * values.numberChildren,
                    storage.getUserInfo().userName,
                    codeTrip,
                  );
                  // show notification
                  showSuccessNotification(
                    "Create Booking Successfully!"

                  );
                  props.history.push("/");

                  // refreshForm();
                } catch (error) {
                  console.log(error);

                  // redirect page error server
                  props.history.push("/auth/500");
                }

              }
            }
            validateOnChange={false}
            validateOnBlur={false}
            handleChange={e =>
              setListValueInput({ ...listValueInput, inputNumberAdult: e.target.value })

            }
          >

            {({ isSubmitting, handleChange }) => (
              <Form className='flex-center'>
                <Col lg="7" className="tongquantrip">
                  <Card className="p-3">
                    <p className="h2">Tổng quan về đơn đặt</p>

                    <Card className="p-2">
                      <CardHeader><CardText tag="h3">Thông tin liên lạc</CardText></CardHeader>
                      <Row style={{ alignItems: "center" }}>
                        <Col lg="6">
                          <label className='h4 font-weight-bolder'>Họ và tên:</label>

                          <FastField
                            type="text"
                            bsSize="lg"
                            name="fullName"
                            placeholder="Nhập họ và tên"
                            component={ReactstrapInput}

                          />
                        </Col>
                        <Col lg="6">
                          <label className='h4 font-weight-bolder'>Số điện thoại:</label>

                          <Field
                            type="text"
                            bsSize="lg"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            component={ReactstrapInput}
                          />
                        </Col>
                      </Row>
                      <Row style={{ alignItems: "center" }}>
                        <Col lg="6">
                          <label className='h4 font-weight-bolder'>Email:</label>

                          <FastField
                            type="email"
                            bsSize="lg"
                            name="email"
                            placeholder="Nhập email"
                            component={ReactstrapInput}
                          />
                        </Col>
                        <Col lg="6">
                          <label className='h4 font-weight-bolder'>Địa chỉ:</label>

                          <FastField
                            type="text"
                            bsSize="lg"
                            name="address"
                            placeholder="Nhập địa chỉ"
                            component={ReactstrapInput}
                          />
                        </Col>
                      </Row>
                    </Card>
                    <CardBody>
                      <CardHeader><CardText tag="h3">Thông tin chuyến đi</CardText></CardHeader>
                      <Row style={{ alignItems: "center" }}>
                        <Col lg="6">
                          <label className='h4 font-weight-bolder'>Người lớn</label>
                          <br />

                          <label> trên 12 tuổi</label>

                          <FastField
                            type="number"
                            bsSize="lg"
                            name="numberAdult"
                            min="0"
                            handleChange={handleChange}
                            placeholder="Nhập số lượng"
                            component={ReactstrapInput}
                         
                          />
                          {/* <FastField
                            type="number"
                            bsSize="lg"
                            name="numberChildren
                            min="0"
                            onChange={e => {
                              handleChange(e)
                              let someValue = e.currentTarget.value
                            }}
                            placeholder="Nhập số lượng"
                            component={CustomInputComponent}
                          /> */}
                          {/* <Field name="numberAdult">
                            {({ field,onChange:{handleChange}, form, meta }) => (
                              <div>
                                <input type="text" {...field}  placeholder="numberAdult" />
                                {meta.ctouched &&
                                  meta.error && <div className="error">{meta.error}</div>}
                              </div>
                            )}
                          </Field> */}


                        </Col>
                        <Col lg="6">
                          <label className='h4 font-weight-bolder'>Trẻ em:</label>
                          <br />
                          <label>  dưới 12 tuổi</label>
                          <FastField
                            type="number"
                            bsSize="lg"
                            name="numberChildren"
                            min="0"

                            placeholder="Nhập số lượng"
                            component={ReactstrapInput}
                          />

                        </Col>

                      </Row>

                    </CardBody>

                    <CardFooter className="text-right">
                      <Button type="submit" className="btn-lg btn-block" color="primary" disabled={isSubmitting} >
                        Đặt ngay
                      </Button>{" "}
                    </CardFooter>

                  </Card>
                </Col>
                <Col lg="4" className="tomtattrip">
                  <Card className="p-3">
                    <CardText tag="h3"> Tóm tắt chuyến đi</CardText>
                    <CardTitle>Dịch vụ tùy chọn:{tripByCodeTrio.hotel}</CardTitle>
                    <CardText tag="h4">{tripByCodeTrio.destinationTour}</CardText>
                    <div className='m-4 d-block'>
                      <CardText className='h5'> <Calendar className='text-primary' />{tripByCodeTrio.startDate}</CardText>
                      <CardText className='h5'> <Calendar className='text-primary' />{tripByCodeTrio.endDate}</CardText>
                    </div>
                    <div>
                      <CardText tag="h4">Hành khách <UserPlus className='float-right'></UserPlus></CardText>
                      <hr></hr>
                      <CardTitle>Người lớn <CardText className='float-right'>{tripByCodeTrio.priceAdult}</CardText></CardTitle>
                      <CardTitle>Trẻ em <CardText className='float-right'>{tripByCodeTrio.priceChildren}</CardText></CardTitle>
                      <CardTitle>Phụ thu phòng <CardText className='float-right'>{tripByCodeTrio.surcharge}</CardText></CardTitle>
                      <hr />
                      <CardText tag="h4">Tổng {listValueInput.inputNumberAdult} <CardText className='float-right'></CardText></CardText>

                    </div>
                  </Card>

                </Col>
              </Form>
            )}
          </Formik>
        </Row>
      </Container >

    </>
  )
}
