import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import cssClasses from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    isEmail: true
                },
                touched: false,
                errorMsg: 'Please enter'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength: 6
                },
                touched: false,
                errorMsg: 'Please enter'
            }
        },
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        const orderForm = this.state.controls;
        let formInputs = Object.keys(orderForm).map((key) => {
            return <Input 
                key={key}
                elementType={orderForm[key].elementType} 
                elementConfig={orderForm[key].elementConfig}
                value={orderForm[key].value}
                invalid={!orderForm[key].valid}
                shouldValidate={orderForm[key].validation}
                touched={orderForm[key].touched}
                errorMsg={orderForm[key].errorMsg}
                changed={(event) => this.inputChangedHandler(event, key)} />;
        });

        if (this.props.loading) {
            formInputs = <Spinner />;
        }

        let errorMsg = null;
        if (this.props.error) {
            errorMsg = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={cssClasses.Auth}>
                <h1>Dio's Burger</h1>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {formInputs}
                    <Button 
                        style={{
                            boxSizing: 'border-box',
                            border: '1px solid #ccc',
                            boxShadow: '1px 2px 1px #ddd',
                            padding: '10px',
                            color: '#3c3c40'
                        }} 
                        btnType="Success">{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
                </form>
                <Button
                    style={{
                        fontSize: '14px',
                        color: '#727273'
                    }} 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.builder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);