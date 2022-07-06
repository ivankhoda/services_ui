import { createStore } from "redux";
import { rootReducer } from "./reducers/reducer";

// const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer
  //applyMiddleware(sagaMiddleware)
);
// sagaMiddleware.run(fetchDataSaga);
