import * as types from "../constants";

export function getListTripAction(bookings, page, totalSize, minTotalMember, maxTotalMember, search) {
    return {
        type: types.GET_LIST_BOOKING,
        payload: {
            bookings,

            page,
            totalSize,



            // search
            search
        }
    };
};

export function updateSelectedRowsAction(selectedRows) {
    return {
        type: types.GET_LIST_BOOKING_SELECTED_ROWS,
        payload: selectedRows
    };
};