import { produce } from 'immer';

import { initialState, LoginState } from "./login.state";
import { LoginActions, LoginActionTypes } from "./login.types";

export const loginReducer = (state: LoginState = initialState, action: LoginActionTypes): LoginState => {
    const { type, payload } = action;
    return produce(state, (draft: LoginState) => {
        switch (type) {
            case LoginActions.LOGIN:
                draft.requestIsPending = true;
                break;
            case LoginActions.LOGIN_SUCCESS:
                draft.requestIsPending = false;
                draft.user = payload;
                draft.isLoggedIn = true;
                break;
            case LoginActions.LOGIN_FAIL:
                draft.requestIsPending = false;
                draft.error = payload;
                break;
            case LoginActions.SET_LOGIN_STATE:
                draft.user = payload.user;
                draft.isLoggedIn = payload.state;
                break;
            default:
                break;
        }
    })
}
