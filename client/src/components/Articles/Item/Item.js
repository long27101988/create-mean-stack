import React from 'react';
import {Link} from 'react-router-dom'
import bulma from 'bulma'
import classes from "./Item.scss"
import PropTypes from "prop-types";

const item = (props) => {

    return (
        <div className = {[bulma['column'], bulma['is-one-quarter'], classes.Item].join(' ')}>
            <Link to={`/detail/${props.article._id}`}>
                <div className={[bulma['card'], bulma['box'], classes.HoverArticle].join(' ')}>
                    <div className={bulma['card-image']}>
                        <figure className={[bulma['image'], bulma['is-4by3']].join(' ')}>
                            <img src={props.article.picture} alt="Placeholder image" />
                        </figure>
                    </div>
                    <div className={bulma['card-content']}>
                        <div className={bulma['media']}>
                            <div className={bulma['media-content']}>
                                <p className={[bulma['title'], bulma['is-4'], classes.TitleItem].join(' ')}>{props.article.name}</p>
                            </div>
                        </div>
                        <div className={bulma['content']}>
                            <p>
                                {props.article.description}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}


item.propTypes = {
    article: PropTypes.shape({
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        description: PropTypes.string
    })
};

item.defaultProps = {
    article: {}
};


export default item;