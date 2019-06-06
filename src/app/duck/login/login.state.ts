export interface LoginState {
    isLoggedIn: boolean;
    user: object | null;
    token: string | null;
    error: string | null;
    requestIsPending: boolean;
}

export const initialState: LoginState = {
    isLoggedIn: false,
    user: null,
    token: null,
    error: null,
    requestIsPending: false,
}
