import lostHorizon from "../api/lostHorizon";

// get warehouse items from the server
export const fetchWarehouseItems = () => async (dispatch, getState) => {
  // make a request to the server for all the items
  const response = await lostHorizon.get("/items");
  // map over them to create an array of item objects
  const payload = response.data.data.map((item) => ({ ...item, id: item._id }));
  // dispatch the action with payload to update the state
  dispatch({ type: "GET_ASSETS", payload });
};

export const getUserInformation = (token) => async (dispatch, getState) => {
  // ping the server for the user information
  const response = await lostHorizon.get(`/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const payload = response.data.user;
  dispatch({ type: "GET_CURRENT_USER", payload });
};

export const notifyUserHitSearch = () => (dispatch, getState) => {
  // create an event to notify the user clicked the search button in the search view
  dispatch({ type: "NOTIFY_USER_CLICKED_SEARCH" });
};

export const notifyUserNavigatedAway = () => (dispatch, getState) => {
  // create an event to notify the user navigated away and its safe to unmount the table
  dispatch({ type: "NOTIFY_USER_NAVIGATED_AWAY" });
};
