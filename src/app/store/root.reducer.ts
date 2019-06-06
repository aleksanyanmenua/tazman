import { combineReducers } from 'redux';

import { loginReducer } from "../duck/login/login.reducer";
import { LoginState } from "../duck/login/login.state";


export interface RootState {
    loginReducer: LoginState;
}

export const rootReducer = combineReducers({
    loginReducer,
});
