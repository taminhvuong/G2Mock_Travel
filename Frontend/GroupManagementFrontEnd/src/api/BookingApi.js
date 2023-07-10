import Api from './Api';
import storage from '../Storage/Storage';

const url = "/bookings";

const getAll = (page = 1, size = 10, sortField = 'codeTrip', sortType = 'desc', search = '') => {

    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`
    }

    // search
    if (search) {
        parameters.search = search;
    }

   

    return Api.get(`${url}`, { params: parameters });
};

const getBookingByUser = (status) => {
    return Api.get(`${url}/getByUser/${storage.getUserInfo().userName}&${status}`);
};

const create = (
    fullName,
    phone,
    email,
    destination,
    address,
    numberAdult,
    numberChildren,
    // totalPrice,
    nameUser,
    codeTrip,
    ) => {

    const body = {
        fullName,
        phone,
        email,
        destination,
        address,
        numberAdult,
        numberChildren,
        // totalPrice,
        nameUser,
        codeTrip,
    }

    return Api.post(`${url}/save`, body);
};

const getById = (codeTrip) => {
    return Api.get(`${url}/${codeTrip}`);
};


const update = (codeTrip,endDate,startDate,numberOfPassengers,priceAdult,surcharge, codeTour) => {

    const body = {
        endDate,
        startDate,
        numberOfPassengers,
        priceAdult,
        surcharge, 
        codeTour
    }

    return Api.put(`${url}/${codeTrip}`, body);
};

const deleteByIds = (ids) => {
    
    return Api.delete(`${url}/deleteList/${ids.toString()}`);
};

// export
const api = { getAll, create, getById, update, deleteByIds,getBookingByUser }
export default api;