type InitialState = {
  customers: [];
};

const initialState: InitialState = {
  customers: [],
};

export const clients = (state = initialState, action?: { type: string; payload: any }) => {
  return state;
};
