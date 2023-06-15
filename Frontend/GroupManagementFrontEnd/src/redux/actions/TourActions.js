import * as types from "../constants";

export function getListTourAction(tours, codeTours, page,totalSize,search) {
  return {
    type: types.GET_LIST_TOUR,
    payload: {
      tours,
  codeTours,
      page,
      totalSize,

      // filter
     

      // search
      search
    }
  };
};

export function updateSelectedRowsAction(selectedRows) {
  return {
    type: types.GET_LIST_TOUR_SELECTED_ROWS,
    payload: selectedRows
  };
};