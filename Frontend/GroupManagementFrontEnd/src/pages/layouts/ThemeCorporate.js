import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enableCorporateTheme } from "../../redux/actions/themeActions";

import Dashboard from "../trip/TripUI";

const ThemeCorporate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableCorporateTheme());
  }, [dispatch])

  return <Dashboard />
}

export default ThemeCorporate;
