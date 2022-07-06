import { combineReducers } from "redux";
import { clients } from "./clientsReducer";

export const rootReducer = combineReducers({ clients });
export type RootState = ReturnType<typeof rootReducer>;
