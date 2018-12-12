import React from 'react'
import bulma from 'bulma'
import classes from './Footer.scss'

const footer = (props) => {
    return (
        <footer className={[bulma["footer"], classes.Footer].join(' ')}>
            <div className={[bulma["content"], bulma["has-text-centered"]].join('')}>
                <p>Copyright 2018. All right reserved.</p>
            </div>
        </footer>
    )
}

export default footer;