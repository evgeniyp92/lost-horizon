import React from "react";
import Cookies from "js-cookie";

import { cyan } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import LoginView from "./Views/LoginView";

import { connect } from "react-redux";
import { fetchWarehouseItems } from "../actions";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: cyan,
  },
});

/**
 * Use this as the core element of the layout, and to generally orchestrate
 * components
 */

function App({ fetchWarehouseItems }) {
  // console.log(Cookies.get("jwt"));

  React.useEffect(() => {
    // get the warhouse list on render FIXME: this triggers the network request
    // even before the user is logged in
    fetchWarehouseItems();
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-row w-screen h-screen">
        {!Cookies.get("jwt") && <LoginView />}
        {Cookies.get("jwt") && (
          <>
            <SidebarMenu />
            <div className="p-5 pl-0 w-full h-full">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default connect(null, { fetchWarehouseItems })(App);
