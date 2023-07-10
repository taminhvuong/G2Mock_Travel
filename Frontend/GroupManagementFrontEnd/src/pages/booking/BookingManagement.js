import React, { useEffect, useState } from "react";
import classnames from "classnames";

import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  
Button,
CardText,
CardBody,
Card,CardHeader,
  TabContent,
  TabPane
} from "reactstrap";
import BookingApi from '../../api/BookingApi';
import { selectBookingsByUser } from "../../redux/selectors/BookingSelector";
import { connect } from "react-redux";
import BookingTabCreated from "./BookingTabCreated";
import BookingTabPay from "./BookingTabPay";


import { getListBookingAction, getListBookingByUserAction, updateSelectedRowsAction } from '../../redux/actions/BookingAction';


const BookingManagement=(props) =>{
  const [isOpen,setIsOpen]=useState(true)
  const getListBooking = props.getListBookingByUserAction;
const [status,setStatus]=useState(0)

  useEffect(() => {
    const getBookingUser = async () => {
      const result = await BookingApi.getBookingByUser(status)
      const bookingByUsers = result;
      getListBooking(bookingByUsers);
      console.log(bookingByUsers)
    }
    getBookingUser();
  }, [getListBooking ,status]);


  return (


    <>
      <div className="container">
        <Row>
          <Col lg="6"  className="h2">
            <Button className="btn-lg " color={(isOpen==true)?("primary"):""} onClick={()=>{setIsOpen(true) ; setStatus(0)}}>Đã đặt</Button>



          </Col>
          <Col lg="6" className="h2">
          <Button className="btn-lg" color={(isOpen!=true)?("primary"):""} onClick={()=>{setIsOpen(false);
          setStatus(1)}}>Đã thanh toán</Button>

          </Col>
        </Row>
        <Row>
          <Col lg="12">
          {
            isOpen==true?<BookingTabCreated bookingByUsers={props.bookingByUsers}></BookingTabCreated>:<BookingTabPay  bookingByUsers={props.bookingByUsers} ></BookingTabPay>
          }
          </Col>
         
                                
        </Row>
      </div>

    </>

  )
}
const mapGlobalStateToProps = state => {
  return {
    bookingByUsers: selectBookingsByUser(state),
   
  };
};

export default connect(mapGlobalStateToProps, { getListBookingByUserAction })(BookingManagement);
