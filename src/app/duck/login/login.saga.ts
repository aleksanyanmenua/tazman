import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from "axios";

import { LoginActions, LoginActionTypes } from "./login.types";

import { login as loginRequest } from "../../../api/request/request";
import { loginFail, loginSuccess } from "./login.action";

export function* loginSaga() {
    yield takeLatest(LoginActions.LOGIN, login);
}

export function* login(action: LoginActionTypes) {
    try {
        const res: AxiosResponse = yield call(loginRequest, action.payload);
        yield put(loginSuccess(res.data));
    } catch (e) {
        console.log(e);
        yield put(loginFail(e.response.data.errors || e));
    }
}

export function* loginSuccessSaga() {
    yield takeLatest(LoginActions.LOGIN_SUCCESS, setToken)
}

export function* setToken(action: LoginActionTypes) {
    try {
        yield localStorage.setItem('accessToken', action.payload.token);
        yield window.location.href = '/dashboard';
    } catch (e) {
        console.log(e);
    }
}

