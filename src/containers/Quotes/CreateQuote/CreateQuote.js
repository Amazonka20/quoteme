import React, {useState, useEffect} from 'react';
import axios from "../../../utility/axios-utility";
import classes from './CreateQuote.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from "../../../components/UI/Button/Button";
import {updateObject, validateForm} from "../../../utility/utility";
import * as quoteClient from '../../../utility/serviceRequest/quoteClient/quoteClient';
import {connect} from 'react-redux';
import {NavLink, useHistory} from "react-router-dom";

const CreateQuote = (props) => {
    const [quoteForm, setQuoteForm] = useState({
        category: {
            elementType: 'select',
            elementConfig: {
                placeholder: "Category",
                options: []
            },
            value: props.categoryValue ? props.categoryValue : '',
            validation: {},
            label: 'Category:'
        },
        author: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Author',
            },
            value: props.authorValue ? props.authorValue : '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 100,
                onlyLetters: true,
            },
            label: 'Author:'
        },
        quote: {
            elementType: 'textarea',
            elementConfig: {
                rows: 6,
                cols: 8,
                placeholder: 'Quote',
            },
            value: props.QuoteValue ? props.QuoteValue : '',
            validation: {
                required: true,
                minLength: 1,
                maxLength: 3000,
            },
            label: 'Quote:'
        },
        private: {
            elementType: 'checkbox',
            elementConfig: {
                type: 'checkbox',
                placeholder: 'Private',
            },
            value: props.privatValue ? props.privatValue : false,
            label: 'Private:'
        },
    });

    const [validationMessage, setValidationMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isButtonDisabled, setButtonDisable] = useState(true);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setValidationMessage("");
        setSuccessMessage("");

        let error = validateForm(quoteForm);
        if (error) {
            setValidationMessage(error);
        } else {
            const data = {
                author: quoteForm.author.value,
                category: quoteForm.category.value,
                text: quoteForm.quote.value,
                private: quoteForm.private.value,
            }

            if (props.updateQuote) {
                props.updateQuote(data);
            } else {
                quoteClient.createQuote(data, props.token, setSuccessMessage, setValidationMessage);
            }
        }
    }

    function updateCategoryForm(response) {
        const categories = response.data.map(elem => {
            return {value: elem, displayValue: elem}
        });
        setQuoteForm(prevState => ({
            ...prevState,
            category: {
                ...prevState.category,
                value: categories[2].value,
                elementConfig: {
                    ...prevState.category.elementConfig,
                    options: categories
                },
            }
        }))
    }

    useEffect(() => {
        quoteClient.initCategory(updateCategoryForm);
    }, []);

    const inputChangeHandler = (event, inputName) => {
        const updatedFormElement = updateObject(quoteForm[inputName], {
            value: event.target.type !== "checkbox" ? event.target.value : event.target.checked,
        });

        const updatedQuoteForm = updateObject(quoteForm, {
            [inputName]: updatedFormElement
        });
        setQuoteForm(updatedQuoteForm);
        setValidationMessage('');
        setButtonDisable(false);
    }


    const formElementArray = [];
    for (let key in quoteForm) {
        formElementArray.push({
            key: key,
            config: quoteForm[key]
        });
    }

    let form = (
        <form onSubmit={event => onSubmitHandler(event)}>
            {formElementArray.map(formElement => (
                <Input
                    key={formElement.key}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    label={formElement.config.label}
                    changed={event => inputChangeHandler(event, formElement.key)}
                />
            ))}
            <div className={classes.button}>
                <Button disabled={isButtonDisabled}>{props.button ? props.button : "Create"}</Button>
                <NavLink to="/">
                    <Button>Cancel</Button>
                </NavLink>
            </div>

        </form>
    );

    let validationError = validationMessage ?
        <p className={`${classes.validationMessage} ${classes.invalid}`}>{validationMessage}</p> : null;
    let validationSuccess = successMessage ?
        <p className={`${classes.validationMessage} ${classes.success}`}>{successMessage}</p> : null;

    return (
        <div className={classes.box}>
            <h3 className={classes.title}>{props.titleEditPage ? props.titleEditPage : 'Create quote'}</h3>
            {validationError}
            {validationSuccess}
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.login.token,
    }
}

export default connect(mapStateToProps)(CreateQuote);