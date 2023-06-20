import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  Bell as Bellicon,
  BookOpen as BookOpenIcon,
  Instagram as InstagramIcon,
 Facebook as FaceBookIcon,
 Youtube as YoutubeIcon,
Phone as PhoneIcon,
} from "react-feather";
const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <Row className="">
        <Col xs="4" className="text-left">
         
          <h4>Du lịch trong nước</h4>
          <ul className="list-inline">
            <li className="list-inline-item">
            <p className="mb-0" href="#">Hà Nội</p>
              <p className="mb-0" href="#">Huế</p>
              <p className="mb-0" href="#">Quảng Bình</p>
              <p className="mb-0" href="#">Đà Nẵng</p>
              <p className="mb-0" href="#">Nha Trang</p>
              <p className="mb-0" href="#">Đà Lạt</p>
            </li>
            <li className="list-inline-item">
              <p className="mb-0" href="#">
                Hạ Long
              </p>
              <p className="mb-0" href="#">Bà Rịa - Vũng Tàu</p>
              <p className="mb-0" href="#">Phú Quốc</p>
              <p className="mb-0" href="#">Côn Đảo</p>
              <p className="mb-0" href="#">Hà Giang</p>
              <p className="mb-0" href="#">Cần Thơ</p>
            </li>
          </ul>
        </Col>
        <Col xs="4" className="text-left">
        
          <p className=" h3"> Liên hệ</p>
          <p className="mb-0"> 190 Pasteur, Phường Võ Thị Sáu, Quận 3, TPHCM</p>
          <p className="mb-0"> (+84 28) 3822 8898 </p>
          <p className="mb-0"> (+84 28) 3829 9142</p>
          <p className="mb-0">  info@vietravel.com</p>
          <p className="mt-3 h3">Mạng xã hội</p>
          <FaceBookIcon className="ml-1 "/><InstagramIcon className="ml-1 "/>
          <YoutubeIcon className="ml-1 "/><PhoneIcon className="ml-1 "/>

        </Col>
        <Col xs="4" className="text-left">
        <h4>Thanh toán</h4>
          <p className="mb-0">
            &copy; {new Date().getFullYear()} -{" "}
            <span href="/" className="">
             VN Pay
            </span>
          </p>

        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
