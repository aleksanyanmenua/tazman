import React from 'react';
import {
    Form,
    Button,
    Card,
    CardContent,
    CardHeader,
    Message,
    Image,
    Icon
} from 'semantic-ui-react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

interface LoginFormProps {
    signIn: Function;
    loginError: string | null;
    requestIsPending: boolean;
}

const initValues = {
    email: '',
    password: '',
}

interface FormValues {
    email: string;
    password: string;
}

const formConfig = Yup.object().shape<FormValues>({
    email: Yup.string()
        .email('Please provide a valid email address!')
        .label('Email')
        .required('Email is required!'),
    password: Yup.string()
        .label('Password')
        .required('Password is required!')
})

export const LoginForm: React.FC<LoginFormProps> = (props) => {
    return (
        <Card className="ui centered d-flex justify-content-start text-center px-2 py-5" color="teal" raised fluid>
            <div className="d-flex justify-content-center align-items-center pb-2">
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                       circular
                       size="tiny"/>
            </div>
            <CardHeader className="mb-2 pb-2">
                <h2 className="text teal">Sign In</h2>
                {
                    props.loginError ? (
                        <Message error header="Something went wrong!" content={props.loginError}/>
                    ) : null
                }
            </CardHeader>
            <CardContent>
                <Formik
                    initialValues={initValues}
                    validationSchema={formConfig}
                    onSubmit={(values) => props.signIn(values.email, values.password)}>
                    {
                        (formikProps: FormikProps<FormValues>) => {

                            const {
                                values,
                                touched,
                                errors,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                            } = formikProps;

                            return (
                                <Form size={'big'} key={'big'}
                                      className={((errors.email && touched.email) || (errors.password && touched.password)) ? 'error' : 'some'}
                                      loading={props.requestIsPending}
                                      onSubmit={handleSubmit}>

                                        <>
                                            <Form.Input label="Email"
                                                        name="email"
                                                        onChange={handleChange('email')}
                                                        onBlur={handleBlur('email')}
                                                        value={values.email}
                                                        icon="mail"
                                                        iconPosition="left"
                                                        placeholder="Email"
                                                        error={Boolean(errors.email && touched.email)}/>
                                            {
                                                (errors.email && touched.email) ? (
                                                    <Message
                                                        error
                                                        content={errors.email}
                                                    />
                                                ) : null
                                            }
                                        </>

                                        <>
                                            <Form.Input label="Password"
                                                        name="password"
                                                        onChange={handleChange('password')}
                                                        onBlur={handleBlur('password')}
                                                        value={values.password}
                                                        iconPosition="left"
                                                        icon="lock"
                                                        placeholder="Password"
                                                        error={Boolean(errors.password && touched.password)}/>
                                            {
                                                errors.password && touched.password ? (
                                                    <Message
                                                        error
                                                        content={errors.password}
                                                    />
                                                ) : null
                                            }
                                        </>

                                    <Button animated
                                            type="submit"
                                            color="teal"
                                            onSubmit={handleSubmit}>
                                        <Button.Content visible>Sign In</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </CardContent>
        </Card>
    )
};
