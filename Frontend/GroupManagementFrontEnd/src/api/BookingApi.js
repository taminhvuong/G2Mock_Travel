import Api from './Api';

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

    // filter
    // if (minTotalMember !== null && minTotalMember !== undefined) {
    //     parameters.minTotalMember = minTotalMember;
    // }

    // if (maxTotalMember !== null && maxTotalMember !== undefined) {
    //     parameters.maxTotalMember = maxTotalMember;
    // }

    return Api.get(`${url}`, { params: parameters });
};



const create = (
    fullName,
    phone,
    email,
    address,
    numberAdult,
    numberChildren,
    totalPrice,
    nameUser,
    codeTrip,
    ) => {

    const body = {
        fullName,
        phone,
        email,
        address,
        numberAdult,
        numberChildren,
        totalPrice,
        nameUser,
        codeTrip,
    }

    return Api.post(`${url}/save`, body);
};

const getById = (codeTrip) => {
    return Api.get(`${url}/${codeTrip}`);
};
// const getDetailByCodeTrip = (codeTrip) => {
//     return Api.get(`${url}/getDetailTour/${codeTrip}`);
// };

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
const api = { getAll, create, getById, update, deleteByIds }
export default api;