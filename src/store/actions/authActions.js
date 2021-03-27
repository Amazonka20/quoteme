import axios from "../../utility/axios-utility";
import * as actionsType from '../ActionTypes';
import * as userRepository from '../../utility/repository/userRepository';


export const logout = () => {
    userRepository.clearStorage();
    return {
        type: actionsType.AUTHENTICATE_LOGOUT,
    }
}

export const authSuccess = (token, user) => {
    return {
        type: actionsType.AUTHENTICATE_SUCCESS,
        token: token,
        user: user,
    };
};

export const authFail = (error) => {
    return {
        type: actionsType.AUTHENTICATE_FAIL,
        error: error,
    };
};

export const login = (email, password, errorHandler) => {
    const data = {
        email: email,
        password: password
    }
    return dispatch => {

        axios.post('/authenticate', data)
            .then(response => {
                dispatch(authSuccess(response.data.token, response.data.user));
                userRepository.setToken(response.data.token);
                userRepository.setUser(response.data.user);
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
                errorHandler(error);
            });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = userRepository.getToken();
        if (token) {
            dispatch(authSuccess(token));
        }
    }
}
