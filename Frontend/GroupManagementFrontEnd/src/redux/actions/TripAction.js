import * as types from "../constants";

export function getListTripAction(trips, page, totalSize, minTotalMember, maxTotalMember, search) {
  return {
    type: types.GET_LIST_TRIP,
    payload: {
      trips,
      page,
      totalSize,

      // filter
      minTotalMember,
      maxTotalMember,

      // search
      search
    }
  };
};

export function updateSelectedRowsAction(selectedRows) {
  return {
    type: types.GET_LIST_TRIP_SELECTED_ROWS,
    payload: selectedRows
  };
};