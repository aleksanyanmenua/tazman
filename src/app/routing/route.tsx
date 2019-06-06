import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isLoggedIn } from '../../api/request/request';
import { ConnectedLoginComponent } from '../../app/view/screen/login/login';
import { Dashboard } from "../view/screen/dashboard/dashboard";


/**
 * @desc HOC for creating private routes.
 * @param Component
 * @returns Component
 */
const PrivateRoute = ({component: Component, ...rest}: { component: any, [key: string]: any }) => (
    <Route {...rest} render={(props) => (
        isLoggedIn() ? <Component {...props} />
            : <Redirect exact
                        to={{
                            pathname: '/login',
                            state: {from: props.location}
                        }}
            />
    )}/>
);

export class Router extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Redirect exact from="/" to="login"/>
                    <Route exact path="/login" component={ConnectedLoginComponent}/>
                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        )

    }
}
