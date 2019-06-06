export enum LoginActions {
    LOGIN = '[Login] Login',
    LOGIN_SUCCESS = '[Login] Login Success',
    LOGIN_FAIL = '[Login] Login Fail',
    SET_LOGIN_STATE = '[Login] Set Login State',
}

interface LoginAction {
    type: LoginActions.LOGIN;
    payload: {
        email: string,
        password: string,
    };
}

interface LoginSuccessAction {
    type: LoginActions.LOGIN_SUCCESS;
    payload: any;
}

interface LoginFailAction {
    type: LoginActions.LOGIN_FAIL;
    payload: string;
}

interface SetLoginState {
    type: LoginActions.SET_LOGIN_STATE;
    payload: {
        state: boolean;
        user: object | null;
    };
}

export type LoginActionTypes = LoginAction
    | SetLoginState
    | LoginSuccessAction
    | LoginFailAction;
