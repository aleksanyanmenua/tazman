import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../store/root.reducer';
import { setAuthorizationToken } from '../../api/request/request';
import { loginSaga, loginSuccessSaga } from "../duck/login/login.saga";

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(
            thunk,
            loggerMiddleware,
            sagaMiddleware,
        )
    ));

setAuthorizationToken(store);
sagaMiddleware.run(loginSaga);
sagaMiddleware.run(loginSuccessSaga);

