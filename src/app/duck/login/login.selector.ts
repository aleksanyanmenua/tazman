import { createSelector } from 'reselect';
import { RootState } from "../../store/root.reducer";
import { LoginState } from "./login.state";

export const getLoginState = (state: RootState): LoginState => state.loginReducer;

export const userSelector = createSelector(
    getLoginState,
    state => state.user
);

export const requestStatusSelector = createSelector(
    getLoginState,
    state => state.requestIsPending,
);

export const loggedInStatusSelector = createSelector(
    getLoginState,
    state => state.isLoggedIn
);

export const loginErrorSelector = createSelector(
    getLoginState,
    state => state.error
);
