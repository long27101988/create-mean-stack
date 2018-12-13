import React from 'react';
import bulma from 'bulma'
import classes from './AuthTemplate.scss'

const authTemplate = (props) => {
    return(
        <div className={classes.AuthForm}>
            <h1 className={bulma['title']}>{props.authTitle}</h1>
            <div className={classes.ErrorMessage}>
                {

                    props.errorMessage && (<article className={[bulma['message'], bulma['is-danger']].join(' ')}>
                        <div className={bulma['message-body']}>
                            {props.errorMessage}
                        </div>
                    </article>)
                }
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default authTemplate;