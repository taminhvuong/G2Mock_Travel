import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Table,
  Label,
  FormGroup,
  CardTitle,
  Col,
  CardFooter,
  Input,
  Button,
  Container,
  Row,
} from "reactstrap";
import {
  Clock,
  Monitor,
  Calendar,
  Menu,
  UserPlus,
  Circle,
  Bell as Bellicon,
  BookOpen as BookOpenIcon,
} from "react-feather";
import '../trip/DetailTrip.css'
import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import { useParams } from 'react-router-dom';
import TripApi from '../../api/TripApi';



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

  return (
    <>
      <Container>
        <Row className="rowInoTrip flex-center">
          <Col lg="4" className="flex-center" >
            <img src="https://media.travel.com.vn/tour/tfd_230420052439_028008.jpg" className="img-fluid" alt="image" />

          </Col>
          <Col lg="8" className="flex-center">
            <Card className="my-0 p-3 font-weight-bolder">
              <h2>{tripByCodeTrio.destinationTour}({tripByCodeTrio.hotel})</h2>
              <CardText>Khởi hành: {tripByCodeTrio.startDate}</CardText>
              <CardText>Thời gian: {tripByCodeTrio.timeTour} ngày</CardText>
              <CardText>Nơi khởi hành: {tripByCodeTrio.startingGateTour}</CardText>
              <CardText>Số chỗ còn nhận:{tripByCodeTrio.numberOfPassengers}</CardText>
              <CardText>Dịch vụ nghỉ:{tripByCodeTrio.hotel}</CardText>
            </Card>
          </Col>

        </Row>
        <Row className="rowInoBooking mt-4">


          <Col lg="8" className="tongquantrip">
            <Card className="p-3">
              <p className="h2">Tổng quan về đơn đặt</p>

              <Formik>

                {({ isSubmitting }) => (
                  <Form>

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

                          <FastField
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
                      <CardHeader><CardText tag="h3">Thông tin liên lạc</CardText></CardHeader>
                      <Row style={{ alignItems: "center" }}>
                        <Col lg="6">
                          <label className='h4 font-weight-bolder'>Người lớn</label>
                          <br />
                          <label> trên 12 tuổi</label>
                          <FastField
                            type="number"
                            bsSize="lg"
                            name="numberAdult"
                            min="1"
                            placeholder="Nhập số lượng"
                            component={ReactstrapInput}
                          />
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
                  </Form>
                )}
              </Formik>
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
                <CardTitle>Người lớn <CardText className='float-right'>1*{tripByCodeTrio.priceAdult}</CardText></CardTitle>
                <CardTitle>Trẻ em <CardText className='float-right'>0*{tripByCodeTrio.priceChildren}</CardText></CardTitle>
                <CardTitle>Phụ thu phòng <CardText className='float-right'>{tripByCodeTrio.surcharge}</CardText></CardTitle>
                <hr/>
                <CardText tag="h4">Tổng<CardText className='float-right'></CardText></CardText>

              </div>
            </Card>

          </Col>

        </Row>
      </Container>

    </>
  )
}
