const _INITIAL_STATE = [{ id: 1 }];

const warehouseReducer = (state = _INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ASSETS":
      return action.payload;
    default:
      return state;
  }
};

export default warehouseReducer;
