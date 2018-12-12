import React from 'react';
import _ from 'lodash';

import classes from './Input.scss';
import bulma from 'bulma';


const input  = (props) => {
    let inputElement = null
    let style = null;
    let inputClasses = [classes.InputElement];
    let msgValidate = [];
    let borderError = [];
    let arrayClassHasIcon = [];
    if(props.classModify) {
        props.classModify.map(classItem => {
            inputClasses.push(classItem);
        })
    }
    
    if (props.styleModify) {
       style = props.styleModify
    }

    if(props.invalid && props.shouldValidate && props.touched) {
        borderError.push(classes['is-danger']);
        // inputClasses.push(bulma['is-danger']);
        msgValidate.push(bulma['is-danger']);
    }

    
    if(props.icons && !_.isEmpty(props.icons)) {
        for (let keyIcon in props.icons){
            arrayClassHasIcon.push(props.icons[keyIcon].classIcon);
        }
    }

    

    arrayClassHasIcon = _.flattenDeep(arrayClassHasIcon)

    const labelInput = props.label && !_.isEmpty(props.label) ? <label className={[bulma['label'], classes.Label].join(' ')}>{props.label}</label> : null;
    let errMessage = props.invalid ? <p className={[bulma['help'], msgValidate].join(' ')}>{props.errMsg}</p> : null;
    switch(props.elementType) {
        case 'input': 
            inputElement = < div className = {
                [bulma['control'], classes.inputModifyStyle, ...arrayClassHasIcon, borderError].join(' ')
            } >
                <input 
                    style={style}
                    className={[bulma['input'], ...inputClasses].join(' ')} 
                    {...props.elementConfig}
                    value={props.value} 
                    onChange={props.changed}
                    onKeyPress={props.keypressed}
                />
            </div>
            break;
        case 'hidden':
            inputElement = <div className={[bulma['control']].join(' ')}>
                <input 
                    style={style}
                    className={[...inputClasses].join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                />
            </div>;
            break;
        default: 
            inputElement = <div className={[bulma['control'], classes.inputModifyStyle,...arrayClassHasIcon].join(' ')}>
                <input 
                    style={style}
                    className={[bulma['input'], ...inputClasses].join(' ')} 
                    {...props.elementConfig}
                    value={props.value} 
                    onChange={props.changed}
                    onKeyPress={props.keypressed}
                />
            </div>

    }

    return (
        <div className={[bulma['field'], classes.inputReminder].join(' ')} style={props.style}>
            {labelInput}
            {inputElement}
            {errMessage}
        </div>
    )
}

export default input;