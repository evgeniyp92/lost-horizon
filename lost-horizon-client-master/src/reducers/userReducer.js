const _INITIAL_STATE = {};

const userReducer = (state = _INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_CURRENT_USER":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
