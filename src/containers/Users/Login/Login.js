import React, {useState} from 'react';
import classes from './Login.module.css';
import {validateForm, updateObject} from '../../../utility/utility';
import Input from '../../../components/UI/Input/Input';
import {login} from "../../../store/actions/authActions";
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import Button from "../../../components/UI/Button/Button";

const Login = (props) => {
    const [loginForm, setLoginForm] = useState({
        login: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'E-mail'
            },
            value: '',
            validation: {
                isEmail: true,
                required: true,
            },
            fontAwesomeIcon: 'user',
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
            },
            fontAwesomeIcon: 'certificate',
        },
    });

    const [validationMessage, setValidationMessage] = useState(null);
    const [isButtonDisabled, setButtonDisable] = useState(true);

    const inputChangeHandler = (event, controlName) => {
        const updatedFormElement = updateObject(loginForm[controlName], {
            value: event.target.value,
        });
        const updatedLoginForm = updateObject(loginForm, {
            [controlName]: updatedFormElement
        });

        setLoginForm(updatedLoginForm);
        let isFormFilled = updatedLoginForm.login.value.length > 0  || updatedLoginForm.password.value.length > 0;
        setButtonDisable(!isFormFilled);
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();
        let error = validateForm(loginForm);

        if (error) {
            setValidationMessage(error);
        } else {
            props.onAuth(loginForm.login.value, loginForm.password.value, error => {
                setValidationMessage(error.response.data);
            });
        }
    }

    const formElementsArray = [];
    for (let key in loginForm) {
        formElementsArray.push({
            inputName: key,
            config: loginForm[key]
        });
    }

    let inputs = formElementsArray.map(formElement => (
        <Input
            key={formElement.inputName}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            icon={formElement.config.fontAwesomeIcon}
            changed={event => inputChangeHandler(event, formElement.inputName)}
        />
    ));
    let errorMessage = validationMessage ?
        <p className={`${classes.validationMessage} ${classes.invalid}`}>{validationMessage}</p> : null;

    return (
        <React.Fragment>
            <form className={classes.loginForm} onSubmit={onSubmitHandler}>
                <legend>Login</legend>
                {errorMessage}
                {inputs}
                <div className={classes.button}>
                    <Button disabled={isButtonDisabled} type="submit">Login</Button>
                    <NavLink to="/register">
                        <Button disabled={false}>
                            Register
                        </Button>
                    </NavLink>
                    <NavLink to="/">
                        <Button>Cancel</Button>
                    </NavLink>
                </div>
            </form>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        error: state.login.error,
        token: state.login.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, errorHandler) => dispatch(login(email, pass, errorHandler)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);