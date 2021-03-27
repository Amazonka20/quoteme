import * as actionTypes from '../ActionTypes';

const initialState = {
    token: null,
    error: null,
    user: null,
};

const reducerLogin = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.AUTHENTICATE_SUCCESS):
            return {
                ...state,
                token: action.token,
                user: action.user,
            }
        case (actionTypes.AUTHENTICATE_FAIL):
            return {
                ...state,
                error: action.error,
            }
        case (actionTypes.AUTHENTICATE_LOGOUT):
            return {
                ...state,
                token: null,
                user: null,
            }

        default:
            return state
    }
}

export default reducerLogin;
