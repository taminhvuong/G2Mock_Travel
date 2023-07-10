import Api from './Api';

const url = "/tours";

const getAll = (page = 1, size = 10, sortField = 'codeTour', sortType = 'desc', search = '', minTotalMember, maxTotalMember) => {

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

// const existsByName = (name) => {
//     return Api.get(`${url}/codeTrip/${name}`);
// };

const create = (
    codeTour,
    description,
    destination,

    startingGate,
    tourTime,
    vehicle) => {

    const body = {
        codeTour,
        description,
        destination,

        startingGate,
        tourTime,
        vehicle,
    }

    return Api.post(url, body);
};

const getById = (codeTour) => {
    return Api.get(`${url}/${codeTour}`);
};

const update = (codeTour,
    description,
    destination,

    startingGate,
    tourTime,
    vehicle) => {

    const body = {
        description,
    destination,

    startingGate,
    tourTime,
    vehicle
    }

    return Api.put(`${url}/${codeTour}`, body);
};

// const deleteByIds = (ids) => {

//     return Api.delete(`${url}/deleteList/${ids.toString()}`);
// };

// export
//const api = { getAll, existsByName, create, getById, update, deleteByIds }
const api = { getAll ,create,getById,update}
export default api;