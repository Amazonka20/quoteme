import React, {useState, useEffect} from 'react';
import axios from "../../../utility/axios-utility";
import classes from './EditProfile.module.css';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import Button from "../../../components/UI/Button/Button";
import {updateObject, validateForm} from "../../../utility/utility";
import {NavLink} from "react-router-dom";

function EditProfile(props) {

    const [userForm, setUserForm] = useState({
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "First Name"
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 100,
                onlyLetters: true,
            },
            fontAwesomeIcon: 'user'
        },
        secondName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Second Name"
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 100,
                onlyLetters: true,
            },
            fontAwesomeIcon: 'user'
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
            fontAwesomeIcon: 'envelope'
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: "Password"
            },
            value: '',
            validation: {
                minLength: 6,
                maxLength: 255,
            },
            fontAwesomeIcon: 'certificate'
        },
        confirmPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: "Confirm password"
            },
            value: '',
            validation: {},
            fontAwesomeIcon: 'certificate'
        },
    });

    const [userId, setUserId] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isButtonDisabled, setButtonDisable] = useState(true);

    useEffect(() => {
        requestUserDetails();
    }, []);

    function initUserForm(response) {
        setUserId(response.data.id);
        setUserForm(prevState => ({
            ...prevState,
            firstName: {
                ...prevState.firstName,
                value: response.data.firstName
            },
            secondName: {
                ...prevState.secondName,
                value: response.data.secondName
            },
            email: {
                ...prevState.email,
                value: response.data.email
            },
        }));
    }

    const requestUserDetails = () => {
        axios.get('/users/current', {
                headers: {
                    "Authorization": "Bearer " + props.token,
                }
            }
        )
            .then(response => {
                initUserForm(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const sendUserUpdateRequest = () => {
        axios.put('/users/' + userId, {
                firstName: userForm.firstName.value,
                secondName: userForm.secondName.value,
                email: userForm.email.value,
                password: userForm.password.value ? userForm.password.value : null
            }, {
                headers: {
                    "Authorization": "Bearer " + props.token,
                }
            }
        )
            .then(response => {
                initUserForm(response);
                setSuccessMessage("Profile has been successfully updated");
            })
            .catch(error => {
                console.log(error);
                setValidationMessage("Could not update profile: " + error);
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
            sendUserUpdateRequest();
        }
    }

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

    const formElementsArray = [];
    for (let key in userForm) {
        formElementsArray.push({
            inputName: key,
            config: userForm[key]
        });
    }

    let form = (
        <form onSubmit={event => onSubmitHandler(event)}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.inputName}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    shouldValidate={formElement.config.validation}
                    icon={formElement.config.fontAwesomeIcon}
                    changed={event => inputChangeHandler(event, formElement.inputName)}
                />
            ))}
            <div className={classes.button}>
                <Button disabled={isButtonDisabled} type="submit">Update</Button>
                <NavLink to="/">
                    <Button>Cancel</Button>
                </NavLink>
            </div>
        </form>
    );

    return (
        <React.Fragment>
            <div className={classes.formBox}>
                <h3 className={classes.title}>Edit user profile</h3>
                <p className={classes.invalid}>{validationMessage}</p>
                <p className={classes.success}>{successMessage}</p>
                {form}
            </div>

        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        token: state.login.token,
    }
}

export default connect(mapStateToProps)(EditProfile);
