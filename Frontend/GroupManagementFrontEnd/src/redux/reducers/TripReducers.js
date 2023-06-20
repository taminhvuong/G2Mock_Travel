import * as types from "../constants";

const initialState = {
  trips: [],
  tripByCode:{},
  page: 1,
  size: 9,
  totalSize: 0,

  // filter
  minTotalMember: null,
  maxTotalMember: null,

  // search
  search: null,

  // selected rows
  selectedRows: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_TRIP:
      return {
        ...state,
        trips: actions.payload.trips,
        page: actions.payload.page,
        totalSize: actions.payload.totalSize,
        // filters
        minTotalMember: actions.payload.minTotalMember,
        maxTotalMember: actions.payload.maxTotalMember,
        // search
        search: actions.payload.search
      };
      case types.GET_TRIPBYCODE:
        return {
         
          tripByCode: actions.payload.tripByCode,
          
        };
    case types.GET_LIST_TRIP_SELECTED_ROWS:
      return {
        ...state,
        selectedRows: actions.payload,
      };
    default:
      return state;
  }
}
