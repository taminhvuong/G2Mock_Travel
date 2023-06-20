import React from "react";
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
import './DetailTrip.css'

import {
    Bell as Bellicon,
    BookOpen as BookOpenIcon,
    
    FaceBook as FaceBookIcon,
  } from "react-feather";
import unsplash1 from "../../assets/img/photos/unsplash-1.jpg";
import unsplash2 from "../../assets/img/photos/unsplash-2.jpg";
import unsplash3 from "../../assets/img/photos/unsplash-3.jpg";
import { getListTripAction, updateSelectedRowsAction } from '../../redux/actions/TripAction';
import TripApi from '../../api/TripApi';
import { selectTrips, selectPage, selectSelectedRows, selectSize, selectTotalSize } from "../../redux/selectors/TripSelector";
import { connect } from "react-redux";

const slides =()=> [
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


const ItemTrip = () => {
    return (
        <Col lg="4">
            <Card>
                <CardHeader>
                    <UncontrolledCarousel
                        className="carousel-fade"
                        items={slides}
                        indicators={true}
                        controls={true}
                    />
                </CardHeader>
                <CardBody className="pt-0">
                    <CardTitle tag="h4">Crossfade</CardTitle>
                    <CardText>Khởi hành: </CardText>
                    <CardText>Mã Tour: </CardText>
                    <CardText>Nơi khởi hành: </CardText>
                    <CardTitle tag="h5"></CardTitle>
                    <Button>
                        Chi tiết
                    </Button>
                    <CardText>Số chỗ còn nhận: </CardText>

                </CardBody>
            </Card>
        </Col>
    );
};


export function TripUI(props) {

    const getListTrip = props.getListTripAction;
    const size = props.size;
    let onTotalMemberFilter;

    React.useEffect(() => {
        const getAllTrip = async () => {
            const result = await TripApi.getAll(1, size);
            const trips = result.content;
            console.log(result)
            const totalSize = result.totalElements;
            getListTrip(trips, 1, totalSize);
        }
        getAllTrip();
        console.log(props.trips)
    }, [getListTrip, size]);

    return (

        <Container fluid className="p-0">
            <h1 className="h2 mb-3 text-center">Du lịch trong nước</h1>
            <p>Du lịch trong nước luôn là lựa chọn tuyệt vời. Đường bờ biển dài hơn 3260km, những khu bảo tồn thiên nhiên tuyệt vời, những thành phố nhộn nhịp, những di tích lịch sử hào hùng, nền văn hóa độc đáo và hấp dẫn, cùng một danh sách dài những món ăn ngon nhất thế giới, Việt Nam có tất cả những điều đó. Với lịch trình dày, khởi hành đúng thời gian cam kết, Vietravel là công ty lữ hành uy tín nhất hiện nay tại Việt Nam, luôn sẵn sàng phục vụ du khách mọi lúc, mọi nơi, đảm bảo tính chuyên nghiệp và chất lượng dịch vụ tốt nhất thị trường</p>
            <hr/>
            <h1 className="h3 mb-3 text-center">Danh sách tour du lịch</h1>
            <Row
                data={props.trips}>
                   
                {props.trips.map((row) => {

                    return (
                        <Col lg="4"className="flex-center" >
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
                                    <CardText className="text-right">Số chỗ còn nhận:<b className="h4 text-danger">{row.numberOfPassengers}</b> </CardText>

                                </CardBody>
                            </Card>
                        </Col>
                    );
                })}


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
        selectedRows: selectSelectedRows(state)
    };
};
export default connect(mapGlobalStateToProps, { getListTripAction })(TripUI);