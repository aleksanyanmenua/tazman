import jwt from "jsonwebtoken";
import { Store } from "redux";
import axios, { AxiosPromise } from "axios";

import { UserEndpoints, BASE_URL } from "../index";
import { setLoginState } from "../../app/duck/login/login.action";

export function isLoggedIn() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        return false;
    }
    const decoded = jwt.decode(accessToken) as {[key: string]: string};
    const dateNow = new Date();
    return !(!decoded || (decoded && +decoded['exp'] < dateNow.getTime() / 1000));
}

function getUserFromToken(token: string) {
    const decoded = jwt.decode(token) as {[key: string]: string};
    if (decoded) {
        return {
            email: decoded['email'],
            name: decoded['name'],
            surname: decoded['surname'],
            userId: decoded['user']
        };
    }
    return false;
}

export function setAuthorizationToken(store: Store<any>, accessToken?: string) {
    axios.defaults.baseURL = BASE_URL;
    if(!isLoggedIn()) {
        return;
    }
    const token = accessToken ? accessToken : localStorage.getItem('accessToken');

    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    if (store && token !== null) {
        const user = getUserFromToken(token as string);
        if (user) {
            if (store) {
                store.dispatch(setLoginState(true, user));
            }
        } else {
            // delete axios.defaults.headers.common['Authorization'];
            // store.dispatch({type: authTypes.SET_LOGIN_STATE, loggedIn: false});
        }
    }
}

/*
* USER API CALLS
*/
export function login(data: object): AxiosPromise {
    return axios({
        method: "post",
        url: UserEndpoints.LOGIN,
        data: data
    });
}
