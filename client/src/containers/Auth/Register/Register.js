import React, {Component} from 'react'; 
import bulma from 'bulma'

import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import AuthTemplate from '../AuthTemplate/AuthTemplate'
import Aux from '../../../hoc/Aux/Aux'
import {Redirect} from 'react-router-dom'

import axios from '../../../axios_post';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
import {updateObject,checkValidity} from '../../../share/util';

import classes from './Register.scss';


class Register extends Component {
    state = {
        controls: {
            name: {
                elementType: 'input',
                label: 'Name',
                elementConfig: {
                    type: "text",
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                isShow: true,
                touched: false,
                classModify: [bulma['input']],
                errMsg: ""
            },
            email: {
                elementType: 'input',
                label: 'Email',
                elementConfig: {
                    type: "text",
                    placeholder: 'e.g. mrwick@email.com'
                },
                value: '',
                validation: {
                    required: true
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
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                isShow: true,
                touched: false,
                classModify: [bulma['input']],
                errMsg: ""
            }
        }
    }

    inputChangedHandler = (e, inputIdentify) => {
         let updatedFormElement = updateObject(this.state.controls[inputIdentify], {
             value: e.target.value,
             touched: true,
             valid: checkValidity(e.target.value, this.state.controls[inputIdentify].validation),
             errMsg: !checkValidity(e.target.value, this.state.controls[inputIdentify].validation) ? "This field is not empty!" : "",
         });

         let updatedListElem = updateObject(this.state.controls, {
             [inputIdentify]: updatedFormElement
         });

         this.setState({
             controls: updatedListElem
         });
    }

    onSubmitSignUpForm = (e) => {
        e.preventDefault();

        const formData = {};
        for (let formElemIdentify in this.state.controls) {
            formData[formElemIdentify] = this.state.controls[formElemIdentify].value;
        }
        this.props.onSignUpAccount(formData, this.props.history)
    }

    render() {

        let arrElements = [];

        for (let key in this.state.controls) {
            arrElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        
        return (
            <Aux>
                <AuthTemplate authTitle="Sign Up">
                    <form onSubmit={this.onSubmitSignUpForm}>
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
                                        style={elem.config.style ?  elem.config.style : null}
                                        format={elem.config.format ? elem.config.format : null}
                                        changed={(event) => this.inputChangedHandler(event, elem.id)}
                                    />
                                ))
                            }
                        </div>
                        <div className={classes.FooterLoginForm}>
                            <Button classesButton={[classes.ButtonBase, classes.NoneBorder, bulma['is-primary']]}>
                                <span className={classes.titleAuthButton}>Sign Up</span>
                            </Button>
                        </div>
                    </form>
                </AuthTemplate>
            </Aux>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onSignUpAccount: (data, history) => dispatch(actions.register(data, history))
    }
}

export default connect(null, mapDispatchToProps)(Register)