import React from 'react';

import cssClasses from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let error = null;
    const inputClasses = [cssClasses.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(cssClasses.Invalid);
        error = <p className={cssClasses.ValidationError}>{props.errorMsg}</p>;
    }

    

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
        inputElement = (
            <select 
                className={inputClasses.join(' ')} 
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }

    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>{props.label}</label>
            {inputElement}
            {error}
        </div>
    );
};

export default input;