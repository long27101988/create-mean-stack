import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userData._id,
        userData: userData
    }
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authAction = ({email, password}) => {
    return {
        type: actionTypes.AUTH,
        data: {email, password}
    }
}

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    }
}

export const register = ({email, password, name}, history) => {
    return {
        type: actionTypes.REGISTER,
        data: {email, password, name},
        history: history
    }
}

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS
    }
}

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
}

export const checkAuthTimeout = expirationTime => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
}

export const resetError = () => {
    return {
        type: actionTypes.RESET_ERROR,
    }
}


export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}