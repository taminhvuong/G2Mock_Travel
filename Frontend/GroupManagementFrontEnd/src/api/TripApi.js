import Api from './Api';

const url = "/trips";

const getAll = (page = 1, size = 10, sortField = 'codeTrip', sortType = 'desc', search = '', minTotalMember, maxTotalMember) => {

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

const existsByName = (name) => {
    return Api.get(`${url}/codeTrip/${name}`);
};

const create = (
     codeTrip,
    endDate,
    startDate,
    numberOfPassengers,
    priceAdult,
    surcharge,
    codeTour) => {

    const body = {
        codeTrip,
        endDate,
        startDate,
        numberOfPassengers,
        
        priceAdult,
        surcharge,
        codeTour,
    }

    return Api.post(url, body);
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
const api = { getAll, existsByName, create, getById, update, deleteByIds }
export default api;