export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const validateForm = (form) => {
    for (let key in form) {
        let validationMessage = validate(form[key].value, form[key].validation, form[key].elementConfig.placeholder);

        if (validationMessage.error) {
            return validationMessage.error;
        }
    }
}

export const validate = (value, rules, valueName) => {
    if (!rules || !rules.required && !value) {
        return {};
    }

    if (rules.required) {
        if (value.trim() === '') {
            return {
                error: valueName + ' cannot be empty',
            }
        }
    }

    if (rules.minLength) {
        if (value.length < rules.minLength) {
            return {
                error: valueName + ' is too short. Min length is at least ' + rules.minLength + ' chars'
            }
        }
    }

    if (rules.maxLength) {
        if (value.length >= rules.maxLength) {
            return {
                error: valueName + ' is too long. Max length is ' + rules.maxLength
            }
        }
    }

    if (rules.onlyLetters) {
        if ((/[^a-zA-Zа-яА-Я]\s\d/).test(value)) {
            return {
                error: valueName + ' must contain only letters'
            }
        }
    }

    if (rules.isEmail) {
        const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!emailPattern.test(value)) {
            return {
                error: "Email format is incorrect"
            }
        }
    }

    return {};
}
