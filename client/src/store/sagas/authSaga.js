import { delay } from "redux-saga";
import {put, call} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from "../../axios_post";

export function* signUpSaga(action) {
    yield put(actions.registerStart())

    const registerData = {
        email: action.data.email,
        password: action.data.password,
        name: action.data.name
    };

    let url = "users/register";
    try{
        const response = yield axios.post(url, registerData);
        yield put(
            actions.registerSuccess()
        );
        yield action.history.push('/login')

    }catch(err) {
        yield put(actions.registerFail(err.response.data.error));
    }
}

export function* loginSaga(action) {
    yield put(actions.authStart()) 

    const authData = {
        email: action.data.email,
        password: action.data.password
    };

    let url = "users/login";
    try {
        const response = yield axios.post(url, authData);
        const token = response.data.token
        const expirationDate = yield new Date(
            new Date().getTime() + (3600 * 24 * 1000)
        );
        yield localStorage.setItem("token", response.data.token);
        yield localStorage.setItem("expirationDate", expirationDate);
        delete(response.data.token)
        yield localStorage.setItem("userData", JSON.stringify(response.data));
        yield put(
            actions.authSuccess(token, response.data)
        );
    } catch (error) {
        yield put(actions.authFailure(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token");
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(
            localStorage.getItem("expirationDate")
        );
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userData = yield localStorage.getItem("userData");
            yield put(actions.authSuccess(token, userData));
            yield put(
                actions.checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        }
    }
}


export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}


export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userData");
    yield put(actions.logoutSucceed());
}




// export function* signOutSaga(action) {
//     try{
//         const signout = yield userAction.signOut();
//         yield put(actions.signoutSuccess())
//     }catch(error) {
//         console.log(error);
//     }
// }

// export function* signInSaga(action) {
//     // console.log(action);
//     try{
//         const signInUser = yield userAction.signIn(action.data);
//         if(signInUser) {
//             const userData = {
//                 displayName: signInUser.user.displayName,
//                 email: signInUser.user.email,
//                 uid: signInUser.user.uid,
//                 providerData: signInUser.user.providerData,
//                 phoneNumber: signInUser.user.phoneNumber,
//                 photoURL: signInUser.user.photoURL,
//                 isAnonymous: signInUser.user.isAnonymous,
//                 emailVerified: signInUser.user.emailVerified,
//                 refreshToken: signInUser.user.refreshToken,
//                 metadata: signInUser.user.metadata
//             }
//             localStorage.setItem("userData", JSON.stringify(userData))
//             yield put(actions.authSuccess(signInUser))
//         }
//     }catch(error) {
//         console.log(error)
//     }
// }

// export function* resetPasswordSaga(action) {
//     try{
//         yield userAction.sendForgotPassword(action.email)
//     }catch(error) {
//         console.log(error);
//     }
// }

// export function* updateNewPasswordSaga(action) {
//     try{
//         yield userAction.resetPasswordByCode(action.code, action.password)
//     }catch(error) {
//         console.log(error);
//     }
// }