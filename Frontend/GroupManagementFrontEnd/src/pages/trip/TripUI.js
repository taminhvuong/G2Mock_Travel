import React,{useState} from "react";
import {
    Card,
    CardText,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Button,
    Container,
    Row,
    InputGroupAddon,
    Pagination,
    PaginationItem,
    PaginationLink,
    UncontrolledCarousel
} from "reactstrap";

import './DetailTrip.css';

import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import {Plus,Edit,} from "react-feather";
import unsplash1 from "../../assets/img/photos/unsplash-1.jpg";
import unsplash2 from "../../assets/img/photos/unsplash-2.jpg";
import unsplash3 from "../../assets/img/photos/unsplash-3.jpg";
import { getListTripAction } from '../../redux/actions/TripAction';
import TripApi from '../../api/TripApi';
import { selectTrips, selectPage, selectSelectedRows,selectSearch ,selectSize, selectTotalSize } from "../../redux/selectors/TripSelector";
import { connect } from "react-redux";


export function TripUI(props) {

    const getListTrip = props.getListTripAction;
    const size = props.size;


    React.useEffect(() => {
        const getAllTrip = async () => {
            const result = await TripApi.getAll(1, size);
            const trips = result.content;
            const totalSize = result.totalElements;
            getListTrip(trips, 1, totalSize);
        }
        getAllTrip();
    }, [getListTrip, size]);

    const slides = () => [
        {
            src: unsplash1,
            key: "1"
        },
        {
            src: unsplash2,
            key: "2"
        },
        {
            src: unsplash3,
            // altText: "Slide 1",
            //       caption: "Slide 1",
            key: "3"
        }
    ];

    const handleTableChange = async (type, { page, sortField, sortOrder, searchText}) => {


        // sort
        if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
            sortField = 'codeTrip'
            sortOrder = 'desc';
        }

        const result = await TripApi.getAll(page, size, sortField, sortOrder, searchText);
        const trips = result.content;
        getListTrip(trips, page, searchText);

        // refresh form
        const refreshForm = () => {
      
          handleTableChange(null,
            {
              page: 1,
              sortField: null,
              sortOrder: null,
              searchText: null,
              
            }
          );
        }
    }

    return (

        <Container fluid className="p-0">
            <Row >
                <Col lg="6">
                    <Formik
                        key={Date.parse(new Date())}    // fix bug: not-re-render when initialValues changing
                        enableReinitialize
                        initialValues={
                            {
                                search: props.search ? props.search : ''
                            }
                        }
                        onSubmit={
                            values => {
                                // props.onSearch(values.search);
                            }
                        }
                    >

                        <Form>
                            <Row style={{ alignItems: "center" }}>
                                <Col >
                                    <FastField
                                        type="text"
                                        bsSize="lg"
                                        name="search"
                                        placeholder="Search for code trip ..."
                                        component={ReactstrapInput}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <InputGroupAddon addonType="append" color="primary" >
                                        <Button type='submit'>Go!</Button>
                                    </InputGroupAddon>
                                </Col>
                            </Row>
                        </Form>
                    </Formik >
                </Col>
                <Col lg="6" className="text-right pt-3">

                    <Button title="Thêm mới chuyến đi" onClick={() => props.history.push(`/createTrip`)} >
                        <Plus />

                    </Button>
                </Col>
            </Row>


            <h1 className="h2 mb-3 text-center">Du lịch trong nước</h1>
            <p>Du lịch trong nước luôn là lựa chọn tuyệt vời. Đường bờ biển dài hơn 3260km, những khu bảo tồn thiên nhiên tuyệt vời, những thành phố nhộn nhịp, những di tích lịch sử hào hùng, nền văn hóa độc đáo và hấp dẫn, cùng một danh sách dài những món ăn ngon nhất thế giới, Việt Nam có tất cả những điều đó. Với lịch trình dày, khởi hành đúng thời gian cam kết, Vietravel là công ty lữ hành uy tín nhất hiện nay tại Việt Nam, luôn sẵn sàng phục vụ du khách mọi lúc, mọi nơi, đảm bảo tính chuyên nghiệp và chất lượng dịch vụ tốt nhất thị trường</p>
            <hr />
            <h1 className="h3 mb-3 text-center">Danh sách tour du lịch</h1>
            <Row
                data={props.trips}>

                {props.trips.map((row) => {

                    return (
                        <Col lg="4" className="flex-center" >
                            <Card >
                                <CardHeader>
                                    <UncontrolledCarousel
                                        className="carousel-fade"
                                        items={slides()}
                                        indicators={true}
                                        controls={true}
                                    />
                                </CardHeader>
                                <CardBody className="pt-0">
                                    <CardText>Thời gian: <b>{row.startDate} đến {row.endDate}</b></CardText>
                                    <p className="h4 h-25 d-inline-block">{row.destinationTour}</p>
                                    <CardText>Mã Tour:<b>{row.codeTour}</b>   </CardText>
                                    <CardText>Nơi khởi hành:  <b>{row.startingGateTour} </b></CardText>
                                    <p className="h4 text-danger">{row.priceAdult}đ</p>
                                    <Button onClick={() => props.history.push(`/detailTrip/${row.codeTrip}`)}>
                                        Chi tiết
                                    </Button>

                                    <Button className="float-right" color="" onClick={() => props.history.push(`/createTrip/${row.codeTrip}`)}>
                                        <Edit />
                                    </Button>
                                    <CardText className="text-right">Số chỗ còn nhận:<b className="h4 text-danger">{row.numberOfPassengers}</b> </CardText>

                                </CardBody>
                            </Card>
                        </Col>
                    );
                })}


            </Row>
            <Row className="float-right">

                <Pagination>
                    <PaginationItem>
                        <PaginationLink previous />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink >{props.page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next />
                    </PaginationItem>
                </Pagination>


            </Row>
        </Container>
    )
}
const mapGlobalStateToProps = state => {
    return {
        trips: selectTrips(state),
        page: selectPage(state),
        size: selectSize(state),
        totalSize: selectTotalSize(state),
        selectedRows: selectSelectedRows(state),
        search: selectSearch(state),
    };
};
export default connect(mapGlobalStateToProps, { getListTripAction })(TripUI);