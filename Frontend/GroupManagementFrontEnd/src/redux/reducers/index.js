import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import UserLoginInfo from "./UserLoginInfoReducers";
import Group from "./GroupReducers";
import Trip from "./TripReducers";
import Tour from "./TourReducers";
import Booking from "./BookingReducers";

import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,
  UserLoginInfo,
  Group,
  Trip,
  Tour,
  Booking,
});
