import React from 'react'
import {
    Card,
    CardText,
    CardColumns,
    CardBody,
    CardHeader,
    CardTitle,
    Col,

    Button,
    Container,
    Row,
    UncontrolledCarousel
} from "reactstrap";
export default function BookingTabCreated(props) {
    console.log(props.bookingByUsers)
    return (
        <>

            <Container fluid className="p-5">

                <h1 className="h3 mb-3 text-center">Danh sách đơn đặt </h1>
                <hr></hr>
                <Row
                >

                    {props.bookingByUsers.map((row) => {
const amount= row.numberChildren +row.numberAdult;
                        return (
                            <>
                                <Col lg="4" className="flex-center" >
                                    <Card >
                                        <CardHeader>
                                            <img src="https://media.travel.com.vn/tour/tfd_230420052439_028008.jpg" className="img-fluid" alt="image" />

                                        </CardHeader>

                                    </Card>
                                </Col>
                                <Col lg="8" className="d-flex" >

                                    <div className='text-left m-2 w-100'>

                                        <p> <b>{row.startDateTrip} đến {row.endDateTrip}</b></p>
                                        <p className="h3 h-25 ">{row.destination}</p>
                                        <div className=''>
                                            <p className="d-inline">Người lớn: </p>
                                            <p className="d-inline h4"><b>{row.numberAdult}*{row.priceAdultTrip}đ</b>   </p>
                                        </div>
                                        <div className=''>
                                            <p className="d-inline">Trẻ em: </p>
                                            <p className="d-inline h4"><b>{(row.numberChildren > 0) ? (`${row.numberChildren}*${row.priceChildrenTrip}đ`) : ("")}</b>   </p>
                                        </div>
                                        <div className=''>
                                            <p className="d-inline">Phụ phí phòng: </p>
                                            <p className="d-inline h4"><b>{(row.numberChildren > 0) ? (`${row.surchargeTrip}đ`) : ("")}</b>   </p>
                                        </div>



                                        <div className=''>
                                            
                                            <p className="d-inline h3"><b>x {amount}</b>   </p>
                                            <p className="float-right text-right h3">Thành tiền: {row.totalPrice} </p>

                                        </div>
                                        <p className="h4 text-danger"></p>
                                        <Button >
                                            Chi tiết
                                        </Button>


                                    </div>
                                </Col>
                            </>

                        );
                    })}


                </Row>
            </Container>
        </>


    )
}
