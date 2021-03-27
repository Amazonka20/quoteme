import React from 'react';
import classes from './Input.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={classes.inputField}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                onKeyPress={props.onKeyPress}
            />;
            break;
        case('select'):
            inputElement = <select
                className={classes.inputField}
                onChange={props.changed}
                value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>;
            break;
        case('textarea'):
            inputElement = <textarea
                className={classes.inputField}
                onChange={props.changed}
                value={props.value}
                {...props.elementConfig}/>;
            break;
        case('checkbox'):
            inputElement = <input
                className={classes.checkBox}
                {...props.elementConfig}
                value={props.value}
            />;
            break;
        default:
            inputElement = <input
                className={classes.inputField}
                value={props.value}
                {...props.elementConfig}
                onChange={props.changed}/>;
    }

    let fontAwesome = props.icon ?
        <FontAwesomeIcon icon={props.icon} className={classes.icon} onClick={props.iconClick}/> : null;
    let title = props.label ? <label className={classes.title}>{props.label}</label> : null;
    let category = props.categoryTitle ? <label className={classes.categoryTitle}>{props.categoryTitle}</label> : null;
    let required = props.requiredIcon ? <span className={classes.requiredIcon}>*</span> : null;

    return (
        <React.Fragment>
            <div className={classes.inputBox}>
        <span className={classes.inputContainer}>
            {category}
            {title}
            {fontAwesome}
            {inputElement}
        </span>
                {required}
            </div>
        </React.Fragment>
    );
};

export default input;
