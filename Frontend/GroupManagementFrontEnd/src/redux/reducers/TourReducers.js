import * as types from "../constants";

const initialState = {
  tours: [],
 codeTours:[],
  page: 1,
  size: 5,
  totalSize: 0,

  // filter
  

  // search
  search: null,

  // selected rows
  selectedRows: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_TOUR:
      return {
        ...state,
        tours: actions.payload.tours,
       codeTours:actions.payload.codeTours,
        page: actions.payload.page,

        totalSize: actions.payload.totalSize,
        // filters
        
        // search
        search: actions.payload.search
      };

    case types.GET_LIST_TOUR_SELECTED_ROWS:
      return {
        ...state,
        selectedRows: actions.payload,
      };
    default:
      return state;
  }
}
