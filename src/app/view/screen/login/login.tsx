import React from 'react';
import { Container, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import Particles from "react-particles-js";

import { LoginForm } from "../../component/login-form/login.form";
import { requestStatusSelector, loginErrorSelector } from "../../../duck/login/login.selector";
import { RootState } from "../../../store/root.reducer";
import { login } from "../../../duck/login/login.action";
import { particlesParams } from "../../../model/particle.config";
import '../../../asset/css/login/login.css';


interface LoginProps {
    requestIsPending: boolean;
    loginError: string | null;
    signIn: Function;
}

export class Login extends React.Component<LoginProps, any> {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Particles
                    style={{
                        position: 'absolute',
                        zIndex: '-9999',
                        height: '100%',
                        width: '100%',
                    }}
                    params={particlesParams}
                />
                <Container className="whole-screen">
                    <Grid centered verticalAlign="middle" className="full-height">
                        <Grid.Column width="4"
                                     className="full-height d-flex justify-content-center align-content-center">
                            <LoginForm signIn={this.props.signIn}
                                       requestIsPending={this.props.requestIsPending}
                                       loginError={this.props.loginError}/>
                        </Grid.Column>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        requestIsPending: requestStatusSelector(state),
        loginError: loginErrorSelector(state),
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        signIn: (email: string, password: string) => dispatch(login(email, password))
    }
}

export const ConnectedLoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);


