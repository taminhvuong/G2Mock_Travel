import React, { useEffect, useState } from 'react'
import './DetailTrip.css'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import TripApi from '../../api/TripApi';

export default function DetailTrip() {

    const { codeTrip } = useParams()
    console.log(codeTrip)
    const [tripByCodeTrio, setTripByCodeTrio] = useState({
        codeTour: "",
        codeTrip: "",
        destinationTour: "",
        endDate: "",
        numberOfPassengers: "",
        priceAdult: "",
        priceChildren: "",
        startDate: "",
        surcharge: "",
        timeTour: "",

    });
    useEffect(() => {

        getData()
        console.log(tripByCodeTrio.destinationTour)
    }, [codeTrip]);
    async function getData() {
        const tripInfo = await TripApi.getById(codeTrip);

        console.log(tripInfo)

        setTripByCodeTrio(tripByCodeTrio)



    }
    return (
        <>

            <div className="container">
                <div className='row rowPage'>
                    <div className="col-8">
                    <h1>{tripByCodeTrio.numberOfPassengers}</h1>

                    </div>
                    
                    <div className="col-4 text-right ">
                    <button className="btn btn-danger"><h3 className='text-light'>Đặt ngay</h3></button>

                    </div>
                    
                </div>
                {/* <div className="row imgTrip">

                    <div className="col" >
                        <img src='https://wall.vn/wp-content/uploads/2020/04/hinh-anh-nha-trang-7.jpg' width='100%'></img>
                    </div>
                    <div className="col">
                        <div className='row'>
                            <div className="col-6">
                                <img src='https://media.travel.com.vn/tour/tfd_230420052007_136118.jpg' width='90%'></img>


                            </div>
                            <div className="col-6">
                                <img src='https://media.travel.com.vn/tour/tfd_230420052332_006690.jpg' width='97%'></img>

                            </div>
                        </div>
                        <div className='row'>
                            <div className="col">
                                <img src='https://media.travel.com.vn/destination/dc_230420_PHU%20QUOC%20(18).jpg' width='100%'></img>

                            </div>
                        </div>

                    </div>

                </div> */}
                <div className="row rowPage">
                    <div className="col-lg-7 col-md-12 col-sm-12 left">
                        <div className="image">
                            <img src="https://media.travel.com.vn/tour/tfd_230420052439_028008.jpg" width="88%" class="img-fluid" alt="image" />
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 right">
                        <div className="row gy-4">
                            <div className="col-md-12 col-sm-12 small">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="image">
                                            <img src="https://media.travel.com.vn/tour/tfd_230420052007_136118.jpg" width="92%" class="img-fluid" alt="image" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="image">
                                            <img src="https://media.travel.com.vn/tour/tfd_230420052332_006690.jpg" width="110%" class="img-fluid" alt="image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 big">
                                <div className="image">
                                    <img src="https://media.travel.com.vn/destination/dc_230420_PHU QUOC (18).jpg" class="img-fluid" alt="image" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row rowPage">
                    <div className="col-4">
                        <div className="row">
                            <div className="col-4 detailOfTrip" >
                                <p>Khởi hành:</p>

                                <p>Tập trung:</p>

                                <p>Thời gian: </p>

                                <p>Nơi khởi hành:</p>

                                <p>Số chỗ còn nhận: </p>
                            </div>
                            <div className="col-8">
                                <p></p>

                                <p>Trước khi khởi hành 1h30p</p>

                                <p></p>

                                <p></p>

                                <p></p>
                            </div>

                        </div>
                    </div>
                    <div className="col-8 rowSecond">
                        <div className='row'>

                            <div className="col">
                                <p className='title'>Phương tiện di chuyển</p>

                            </div>
                            <div className="col">
                                
                                <p className='title'>Khách sạn</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col">
                                <p className='title'>Ưu đãi</p>

                            </div>

                            <div className="col">
                               
                                <p className='title'>Ẩm thực</p>
                            </div>
                        </div>
                    </div>


                </div>

                <div className='row rowPage'>
                    <h2 >Lịch trình</h2>
                    <div className="col-5">
                    <h4 >Thông tin lịch trình</h4>
                        

                    </div>

                    <div className="col-7">
                    <h4 >Chi tiết lịch trình</h4>
                        
                    </div>
                </div>


                <div className='row rowPage'>
                   
                    <div className="col-5">
                       
                        <h4> Thông tin phương tiện</h4>
                    </div>

                    <div className="col-7">
                        <h4>Giá phòng & phụ thu</h4>
                    </div>
                </div>
            </div >
        </>
    )
}
