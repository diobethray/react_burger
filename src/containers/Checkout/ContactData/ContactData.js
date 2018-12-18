import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    // TODO: improved validation by changing error msg according to the error
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false,
                errorMsg: 'Please enter'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false,
                errorMsg: 'Please enter'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                touched: false,
                errorMsg: 'Please enter'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false,
                errorMsg: 'Please enter'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false,
                errorMsg: 'Please enter'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest'
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = Object.keys(this.state.orderForm)
            .map(key => ({[key] : this.state.orderForm[key].value}))
            .reduce((arr, el) => {
                return {...arr, ...el};
            });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        const formIsValid = Object.keys(updatedOrderForm).map(inputKey => {
            return updatedOrderForm[inputKey].validation ? updatedOrderForm[inputKey].valid : true;
        })
        .reduce((arr, el) => {
            return arr && el
        });

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        let formData = <Spinner />
        const orderForm = this.state.orderForm;
        const formInputs = Object.keys(orderForm).map((key) => {
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

        if (!this.props.loading) {
            formData = (
                <>
                    <h4>Enter your Contact Data</h4>
                    <form onSubmit={this.orderHandler}>
                        {formInputs}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                    </form>
                </>
            );
        }
        return (
            <div className={cssClasses.ContactData}>
                {formData}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.builder.ingredients,
        totalPrice: state.builder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)));