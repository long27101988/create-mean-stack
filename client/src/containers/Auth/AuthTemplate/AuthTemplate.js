import React from 'react';
import bulma from 'bulma'
import classes from './AuthTemplate.scss'

const authTemplate = (props) => {
    return(
        <div className={classes.AuthForm}>
            <h1 className={bulma['title']}>{props.authTitle}</h1>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default authTemplate;