import * as actionTypes from '../ActionTypes';
import reducerLogin from "./authReducer";

describe('auth reducer', () => {
    it('should store the token upon login', () => {
        expect(reducerLogin({
            token: null,
            error: null,
            user: null,
        }, {
            type: actionTypes.AUTHENTICATE_SUCCESS,
            token: 'some token',
            user: 'some user id',
        })).toEqual({
            token: 'some token',
            user: 'some user id',
            error: null,
        })
    })
});