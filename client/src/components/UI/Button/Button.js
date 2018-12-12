import React from 'react';
import bulma from 'bulma';

const button = (props) => {
    let arrClass = [];
    if (props.classesButton) {
        props.classesButton.map(classBtn => {
            arrClass.push(classBtn);
        })
    }

    return (
        <button
            disabled={props.disabled}
            onClick={props.onClickHandle}
            className={[bulma['button'], bulma['default'], ...arrClass].join(' ')}
        >
        {props.children}
        </button>
    )
}

export default button;

