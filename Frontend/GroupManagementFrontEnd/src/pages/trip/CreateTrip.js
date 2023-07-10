import React, { useEffect, useState, useCallback } from "react";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
   CardFooter,
   
   

} from "reactstrap";

import TripApi from '../../api/TripApi';

import * as Icon from 'react-feather';

import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import { toastr } from "react-redux-toastr";
import { useParams } from 'react-router-dom';
import ReactHtmlParser,{processNodes,convertNodeToElement,htmlparser2} from 'react-html-parser'

export default function CreateTrip(props) {


    const { codeTripUpdate } = useParams()
const [dataCKeditor,setDataCKeditor]=useState("");
    const [tripByCodeTrio, setTripByCodeTrio] = useState(
        {});
    useEffect(() => {
        if(codeTripUpdate){

            getTripByCode(codeTripUpdate)

            console.log(tripByCodeTrio)
        }
      

    }, [codeTripUpdate]);
    const getTripByCode = async (codeTrip) => {
        let res = await TripApi.getById(codeTrip);
        setTripByCodeTrio(res)

        console.log(res)
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
    const checkCodeTrip = async ()=> {
        // call api

        const isExists = await TripApi.existsByName(codeTripUpdate);
        return !isExists;
    }
    console.log(tripByCodeTrio)

    return (
        <>
            <Container className="p-5">
            <h1 className="h3 mb-3">Trip Management</h1>
                <Formik
             
             enableReinitialize
                    initialValues={

                        (!codeTripUpdate) ?
                            ({
                                codeTrip: '',
                                // endDate: '',
                                startDate: '',
                                numberOfPassengers: '',
                                priceAdult: '',
                                nameGuide: '',
                                phoneGuide: '',
                                surcharge: '',
                                codeTour: '',

                            }) :
                            ({
                               // tripByCodeTrio,
                                codeTrip: tripByCodeTrio.codeTrip,
                                startDate: tripByCodeTrio.startDate && tripByCodeTrio.startDate !== undefined && tripByCodeTrio.startDate !== null ? tripByCodeTrio.startDate : '',
                              
                                // endDate: tripByCodeTrio && tripByCodeTrio.endDate !== undefined && tripByCodeTrio.endDate !== null ? tripByCodeTrio.endDate : '',

                                priceAdult: tripByCodeTrio && tripByCodeTrio.priceAdult !== undefined && tripByCodeTrio.priceAdult !== null ? tripByCodeTrio.priceAdult : '',
                                numberOfPassengers: tripByCodeTrio && tripByCodeTrio.numberOfPassengers !== undefined && tripByCodeTrio.numberOfPassengers !== null ? tripByCodeTrio.numberOfPassengers : '',
                                surcharge: tripByCodeTrio && tripByCodeTrio.surcharge !== undefined && tripByCodeTrio.surcharge !== null ? tripByCodeTrio.surcharge : '',
                                nameGuide: tripByCodeTrio && tripByCodeTrio.nameGuide !== undefined && tripByCodeTrio.nameGuide !== null ? tripByCodeTrio.nameGuide : '',
                                phoneGuide: tripByCodeTrio && tripByCodeTrio.phoneGuide !== undefined && tripByCodeTrio.phoneGuide !== null ? tripByCodeTrio.phoneGuide : '',

                                codeTour: tripByCodeTrio && tripByCodeTrio.codeTour !== undefined && tripByCodeTrio.codeTour !== null ? tripByCodeTrio.codeTour : '',

                            })
                           
                    }  
                    validationSchema={
                        (!codeTripUpdate)?(Yup.object({
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
                        })):( Yup.object({

                            numberOfPassengers: Yup.number()
                              .min(0, 'Must be greater than or equal 0 and integer')
                              .integer('Must be greater than or equal 0 and integer'),
                            priceAdult: Yup.number()
                              .min(0, 'Must be greater than or equal 0 and integer')
                              .integer('Must be greater than or equal 0 and integer'),
                            surcharge: Yup.number()
                              .min(0, 'Must be greater than or equal 0 and integer')
                              .integer('Must be greater than or equal 0 and integer')
                          }))
                        
                    }

                    onSubmit={(!codeTripUpdate) ? (async values => {
                        try {
                            await TripApi.create(

                                values.codeTrip,
                                // values.endDate,
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
                            props.history.push("/");
                            

                            // Refresh table
                            // refreshForm();
                        } catch (error) {
                            console.log(error);

                            // redirect page error server
                            props.history.push("/auth/500");
                        }
                    }) : (
                        async values => {
                            try {
                                await TripApi.update(
                                    tripByCodeTrio.codeTrip,
                                    // values.endDate,
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
                                props.history.push("/");
                                ;
                                // Refresh table

                            } catch (error) {
                                console.log(error);

                                // redirect page error server
                                props.history.push("/auth/500");
                            }
                        }
                    )

                    }

                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ isSubmitting }) => (
                        <Form className="container w-75">
                            {/* header */}
                            <div className="h4">{(!codeTripUpdate) ? ("Thêm chuyến đi mới") : (`Chỉnh sửa chuyến đi ${tripByCodeTrio.codeTour} từ ngày ${tripByCodeTrio.startDate} - ${tripByCodeTrio.endDate}`)}</div>

                            {/* body */}
                            <div className="m-3">

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
                                {/* <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>Ảnh:</label>
                                    </Col>
                                    <Col>
                                        <FastField
                                            type="file"
                                            bsSize="lg"
                                            name="img1"
                                            placeholder=""
                                            component={ReactstrapInput}
                                        />
                                    </Col>
                                </Row> */}
                                <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>Start_date:</label>
                                    </Col>
                                    <Col>
                                        <FastField
                                            type="date"
                                            bsSize="lg"
                                            name="startDate"
                                            placeholder="Enter start Date"
                                            component={ReactstrapInput}
                                            
                                        />
                                    </Col>
                                </Row>
                                {/* <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>End_date:</label>
                                    </Col>
                                    <Col>
                                        <FastField
                                            type="date"
                                            bsSize="lg"
                                            name="endDate"
                                            placeholder="Enter end Date"
                                            component={ReactstrapInput}
                                            values={tripByCodeTrio.endDate}
                                        />
                                    </Col>
                                </Row> */}
                                <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>NumberOfPassengers:</label>
                                    </Col>
                                    <Col>
                                        <FastField
                                            type="number"
                                            bsSize="lg"
                                            name="numberOfPassengers"
                                            placeholder="Enter number Of Passengers"
                                            component={ReactstrapInput}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>PriceAdult:</label>
                                    </Col>
                                    <Col>
                                        <FastField
                                            type="number"
                                            bsSize="lg"
                                            name="priceAdult"
                                            placeholder="Enter priceAdult"
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
                                            placeholder="Enter surcharge"
                                            component={ReactstrapInput}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>Name Guide:</label>
                                    </Col>
                                    <Col>
                                       {/* <TripManagement dataCKeditor= {dataCKeditor}  setDataCKeditor={setDataCKeditor} ></TripManagement> */}
                                       <FastField
                                            type="text"
                                            bsSize="lg"
                                            name="nameGuide"
                                            placeholder="Enter phone Guide"
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
                                            placeholder="Enter phone Guide"
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
                                            placeholder="Enter code Tour"
                                            component={ReactstrapInput}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            {/* footer */}
                            <div className="float-right">
                                <Button type="submit" color="primary" disabled={isSubmitting}>
                                    {(!codeTripUpdate ) ? ("Thêm") : ("Chỉnh sửa")}
                                </Button>{" "}

                                <Button type="reset" color="primary" onClick={() => { }}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik >
               
             
            </Container>

        </>
    )
}
