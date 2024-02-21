const _INITIAL_STATE = false;

const searchReducer = (state = _INITIAL_STATE, action) => {
  switch (action.type) {
    case "NOTIFY_USER_CLICKED_SEARCH":
      return true;
    case "NOTIFY_USER_NAVIGATED_AWAY":
      return false;
    default:
      return state;
  }
};

export default searchReducer;
