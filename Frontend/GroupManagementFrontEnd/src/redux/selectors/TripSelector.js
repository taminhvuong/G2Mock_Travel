import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const tripSelector = (state) => state.Trip;

const selectTripSelector = createSelector(
    tripSelector,
    state => state.trips);

const selectTripByCodeSelector = createSelector(
    tripSelector,
    state => state.tripByCode);
const selectPageSelector = createSelector(
    tripSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    tripSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    tripSelector,
    state => state.totalSize);

const selectMinTotalMemberSelector = createSelector(
    tripSelector,
    state => state.minTotalMember);

const selectMaxTotalMemberSelector = createSelector(
    tripSelector,
    state => state.maxTotalMember);

const selectSearchSelector = createSelector(
    tripSelector,
    state => state.search);

const selectSelectedRowsSelector = createSelector(
    tripSelector,
    state => state.selectedRows);

/** function */
export const selectTrips = (state) => {
    return selectTripSelector(state);
}
export const selectTripByCode = (state) => {
    return selectTripByCodeSelector(state);
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

export const selectMinTotalMember = (state) => {
    return selectMinTotalMemberSelector(state);
}

export const selectMaxTotalMember = (state) => {
    return selectMaxTotalMemberSelector(state);
}

export const selectSearch = (state) => {
    return selectSearchSelector(state);
}

export const selectSelectedRows = (state) => {
    return selectSelectedRowsSelector(state);
}