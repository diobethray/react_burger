import React from 'react';

import cssClasses from './Order.module.css';

const order = (props) => {
    const ingredients = Object.keys(props.ingredients).map((key) => {
        return (
            <span 
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                    fontSize: '14px'
                }}
                key={key}>{key}({props.ingredients[key]})</span>
        );
    });

    return (
        <div className={cssClasses.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {(Number.parseFloat(props.price)).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;