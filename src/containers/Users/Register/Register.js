import React, {useState} from 'react';
import axios from "../../../utility/axios-utility";
import classes from './Register.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from "../../../components/UI/Button/Button";
import {validateForm, updateObject} from "../../../utility/utility";
import {NavLink, useHistory} from "react-router-dom";

function Register(props) {

    const [userForm, setUserForm] = useState({
        login: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Login"
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 50,
                onlyLetters: true,
            },
            touched: false,
            fontAwesomeIcon: 'fingerprint',
            requiredIcon: true,
        },
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "First Name"
            },
            value: '',
            validation: {
                required: false,
                minLength: 2,
                maxLength: 50,
                onlyLetters: true,
            },
            touched: false,
            fontAwesomeIcon: 'user',
            requiredIcon: false,
        },
        secondName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Second Name"
            },
            value: '',
            validation: {
                required: false,
                minLength: 2,
                maxLength: 50,
                onlyLetters: true,
            },
            touched: false,
            fontAwesomeIcon: 'user',
            requiredIcon: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "E-mail"
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            touched: false,
            fontAwesomeIcon: 'envelope',
            requiredIcon: true,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: "Password"
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 255,
            },
            touched: false,
            fontAwesomeIcon: 'certificate',
            requiredIcon: true,
        },
        confirmPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: "Confirm password"
            },
            value: '',
            validation: {},
            touched: false,
            fontAwesomeIcon: 'certificate'
        },
    });

    const [validationMessage, setValidationMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isButtonDisabled, setButtonDisable] = useState(true);
    let history = useHistory();

    const inputChangeHandler = (event, inputName) => {
        const updatedFormElement = updateObject(userForm[inputName], {
            value: event.target.value,
        });

        const updatedUserForm = updateObject(userForm, {
            [inputName]: updatedFormElement
        });

        setValidationMessage('');
        setUserForm(updatedUserForm);
        setButtonDisable(false);
    }

    const sendUserRegistrationRequest = () => {
        axios.post('/users', {
                login: userForm.login.value,
                firstName: userForm.firstName.value,
                secondName: userForm.secondName.value,
                email: userForm.email.value,
                password: userForm.password.value
            }
        )
            .then(response => {
                setSuccessMessage("User has been successfully registered. Now you can ");
            })
            .catch(error => {
                console.log(error);
                setValidationMessage("Could not register new user: " + error);
            });
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setValidationMessage("");
        setSuccessMessage("");

        let error = validateForm(userForm);
        if (error) {
            setValidationMessage(error);
        } else if (userForm.password.value !== userForm.confirmPassword.value) {
            setValidationMessage("Passwords are not equal");
        } else {
            sendUserRegistrationRequest();
        }
    }


    const formElementsArray = [];
    for (let key in userForm) {
        formElementsArray.push({
            inputName: key,
            config: userForm[key]
        });
    }

    let form = (
        <form className={classes.formBox} onSubmit={event => onSubmitHandler(event)}>
            <legend>Register new user</legend>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.inputName}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    icon={formElement.config.fontAwesomeIcon}
                    requiredIcon={formElement.config.requiredIcon}
                    changed={event => inputChangeHandler(event, formElement.inputName)}
                />
            ))}
            <p className={classes.requiredIcon}><span>*</span> Required</p>
            <div className={classes.button}>
                <Button disabled={isButtonDisabled} type="submit">Register</Button>
                <NavLink to="/">
                    <Button>Cancel</Button>
                </NavLink>
            </div>
        </form>
    );

    let validationError = validationMessage ?
        <p className={`${classes.validationMessage} ${classes.invalid}`}>{validationMessage}</p> : null;
    let validationSuccess = successMessage ?
        <p className={`${classes.validationMessage} ${classes.success}`}>{successMessage}<NavLink
            to="/login"> login</NavLink></p> : null;
    return (
        <React.Fragment>
            <div className={classes.formBox}>
                {validationError}
                {validationSuccess}
                {form}
            </div>
        </React.Fragment>
    );
}

export default Register;
