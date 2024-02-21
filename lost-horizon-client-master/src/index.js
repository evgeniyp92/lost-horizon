/* ---------------------------------- CORE ---------------------------------- */
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

/* ------------------------- ROUTING AND COMPONENTS ------------------------- */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./components/App";
import ProfileView from "./components/Views/ProfileView";
import InventoryView from "./components/Views/InventoryView";
import SearchView from "./components/Views/SearchView";
import ITECView from "./components/Views/ITECView";
import DRMOView from "./components/Views/DRMOView";
import OrdersView from "./components/Views/OrdersView";
import FourOhFour from "./components/FourOhFour/FourOhFour";
import Signup from "./components/Views/Signup";
import ImportView from "./components/Views/ImportView";
import ItemView from "./components/Views/ItemView";

/* ---------------------------------- REDUX --------------------------------- */
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import reducers from "./reducers";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<ProfileView />} />
              <Route path='search' element={<SearchView />} />
              <Route path='inventory'>
                <Route index element={<InventoryView />} />
                <Route path=':id' element={<ItemView />} />
              </Route>
              <Route path='itec' element={<ITECView />} />
              <Route path='drmo' element={<DRMOView />} />
              <Route path='orders' element={<OrdersView />} />
              <Route path='admin' element={<ImportView />} />
            </Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<FourOhFour />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
