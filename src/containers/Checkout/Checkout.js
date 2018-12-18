import React, { Component, Suspense } from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const ContactData = React.lazy(() => import('./ContactData/ContactData'));

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount() {
        if ( !this.props.selectedIngredients ) {
            this.props.history.replace('/burger-builder');
            return;
        }
    }
    
    render () {
        let checkoutSummary = null;
        if (this.props.selectedIngredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/burger-builder" /> : null;
            checkoutSummary = (
                <>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.selectedIngredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                </>
            );
        }
        return (
            <div>
                {checkoutSummary}
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    render={() => (
                        <Suspense fallback={<Spinner />}>
                            <ContactData />
                        </Suspense>
                    )} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedIngredients: state.builder.ingredients,
        purchased: state.order.purchased

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));