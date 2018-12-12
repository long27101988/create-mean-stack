import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../share/util';

const initialState = {
    token: null,
    userData: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};


const registerStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
}

const registerSuccess = (state, action) => {
    console.log("inhrere");
    return updateObject(state, {
        loading: false,
        error: null,
        registerSuccess: true
    })
}

const registerFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userData: action.userData,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogoutSuccess = (state, action) => {
    return updateObject(state, {
        token: null,
        userData: null
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.REGISTER_START: return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogoutSuccess(state, action)
        default: return state;
    }
}

export default reducer;