import { LoginActions, LoginActionTypes } from "./login.types";

export const login = (email: string, password: string):LoginActionTypes => {
    return {
        type: LoginActions.LOGIN,
        payload: {
            email,
            password,
        }
    }
}

export const loginSuccess = (res: any): LoginActionTypes => {
    return {
        type: LoginActions.LOGIN_SUCCESS,
        payload: {
            token: res.access_token
        },
    }
}

export const loginFail = (errMessage: string): LoginActionTypes => {
    return {
        type: LoginActions.LOGIN_FAIL,
        payload: errMessage,
    }
}

export const setLoginState = (state: boolean, user?: object): LoginActionTypes => {
    return {
        type: LoginActions.SET_LOGIN_STATE,
        payload: {
            state: state,
            user: user ? user : null,
        }
    }
}
