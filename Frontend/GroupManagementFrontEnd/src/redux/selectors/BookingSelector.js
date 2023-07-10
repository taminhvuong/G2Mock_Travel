import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const bookingSelector = (state) => state.Booking;

const selectBookingSelector = createSelector(
    bookingSelector,
    state => state.bookings);

const selectBookingByUserSelector = createSelector(
    bookingSelector,
    state => state.bookingByUsers);
const selectBookingByCodeSelector = createSelector(
    bookingSelector,
    state => state.tripByCode);
const selectPageSelector = createSelector(
    bookingSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    bookingSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    bookingSelector,
    state => state.totalSize);



const selectSearchSelector = createSelector(
    bookingSelector,
    state => state.search);

const selectSelectedRowsSelector = createSelector(
    bookingSelector,
    state => state.selectedRows);

/** function */
export const selectBookingsByUser = (state) => {
    return selectBookingByUserSelector(state);
}
export const selectBookings = (state) => {
    return selectBookingSelector(state);
}
export const selectBookingByCode = (state) => {
    return selectBookingByCodeSelector(state);
}

export const selectPage = (state) => {
    return selectPageSelector(state);
}

export const selectSize = (state) => {
    return selectSizeSelector(state);
}

export const selectTotalSize = (state) => {
    return selectTotalSizeSelector(state);
}

export const selectSearch = (state) => {
    return selectSearchSelector(state);
}

export const selectSelectedRows = (state) => {
    return selectSelectedRowsSelector(state);
}