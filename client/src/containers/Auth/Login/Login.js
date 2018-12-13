import React, {Component} from 'react'; 
import bulma from 'bulma'

import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import AuthTemplate from '../AuthTemplate/AuthTemplate'
import axios from '../../../axios_post';
import Aux from '../../../hoc/Aux/Aux'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
import * as actionTypes from '../../../store/actions/actionTypes'
import {updateObject,checkValidity} from '../../../share/util';

import classes from './Login.scss';
import PropTypes from 'prop-types'


class Login extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                label: 'Email',
                elementConfig: {
                    type: "text",
                    placeholder: 'e.g. mrwick@email.com'
                },
                value: '',
                validation: {
                    email: true
                },
                valid: false,
                isShow: true,
                touched: false,
                classModify: [bulma['input']],
                errMsg: ""
            },
            password: {
                elementType: 'input',
                label: 'Password',
                elementConfig: {
                    type: "password",
                    placeholder: ''
                },
                value: '',
                validation: {
                    minLength: 6
                },
                valid: false,
                isShow: true,
                touched: false,
                classModify: [bulma['input']],
                errMsg: ""
            }
        },
        formIsValid: false
    }

    componentWillUnmount() {
        this.props.resetError();
    }

    inputChangedHandler = (event, controlName) => {

        let resultValidate = checkValidity(event.target.value, this.state.controls[controlName].validation)
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                touched: true,
                valid: resultValidate.valid,
                errMsg: resultValidate.errMsg,
            })
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    }

    onSubmitLoginForm = (e) => {
       e.preventDefault();
       const formData = {};
       for (let formElemIdentify in this.state.controls) {
           formData[formElemIdentify] = this.state.controls[formElemIdentify].value;
       }
       this.props.authHandler(formData);
    }

    render() {
        let arrElements = [];

        for (let key in this.state.controls) {
            arrElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }

         let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div>
                {authRedirect}
                <AuthTemplate authTitle="Login" errorMessage={errorMessage}>
                    <form onSubmit={this.onSubmitLoginForm}>
                        <div className={classes.inputForm}>
                            {
                                arrElements.map(elem => (
                                    <Input 
                                        key={elem.id}
                                        elementType={elem.config.elementType}  
                                        elementConfig={elem.config.elementConfig}
                                        value={elem.config.value}
                                        invalid={!elem.config.valid}
                                        shouldValidate={elem.config.validation}
                                        touched={elem.config.touched}
                                        label={elem.config.label}
                                        classModify={elem.config.classModify}
                                        errMsg={elem.config.errMsg}
                                        style={elem.config.style ?  elem.config.style : null}
                                        format={elem.config.format ? elem.config.format : null}
                                        changed={(event) => this.inputChangedHandler(event, elem.id)}
                                    />
                                ))
                            }
                        </div>
                        <div>
                            <Button disabled={!this.state.formIsValid} classesButton={[classes.ButtonBase, bulma['is-primary']]}>
                                <span className={classes.ButtonBaseTitle}>Login</span>
                            </Button>
                        </div>
                    </form>
                </AuthTemplate>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}


const mapDispatchToProps = dispatch => {
    return {
        authHandler: (data) => dispatch(actions.authAction(data)),
        resetError: () => dispatch(actions.resetError())
    }
}

Login.propTypes = {
    authRedirectPath: PropTypes.string.isRequired
};

Login.defaultProps = {
    authRedirectPath: '/'
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)