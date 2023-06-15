import React, { useState, useEffect } from 'react'
import TripApi from '../../api/TripApi';

export default function DetailTrip(props) {
    const [trip, setTrip] = useState()

    useEffect(() => {
        const getAllTrip = async () => {
            const result = await TripApi.getById(props.codeTrip);
            console.log(result)

            setTrip(result);
        }

    }, [props.codeTrip]);
    return (
        <>
            <h3 className='destinationTour'> </h3>
            <div className='img'>
                <img src="" width="70%" />
            </div>
            <div className='content'>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={8}>
                        <Item>
                            <label>Khởi hành</label>
                            <p></p>
                            <p>Tập trung:Trước khi khởi hành 1h 30 phút</p>
                            <label>Thời gian</label>
                            <p></p>
                            <label>Nơi khởi hành</label>
                            <p></p>
                            <label>Số chỗ còn nhận</label>
                            <p></p>
                        </Item>
                    </Grid>
                    <Grid item xs={8} spacing="1">
                        <Item>
                            <Grid container item spacing={3}>
                                <FormRow >

                                </FormRow >

                            </Grid>
                            <Grid container item spacing={3}>
                               <FormRow >
                                    
                                </FormRow >
                            </Grid>
                            
                        </Item>
                    </Grid>
                </Grid>
            </div>
            <div className='detailTour'></div>
        </>

    )
}
