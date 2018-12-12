import React, {Component} from 'react';
import bulma from 'bulma'
import Article from './Item/Item'
import classes from './Articles.scss'

import {connect} from 'react-redux';
import * as actions from '../../store/actions/'

class Articles extends Component {

    componentDidMount= () => {
       if (this.props.isAuthenticated) {
           this.props.fetchArticlesHandler(this.props.token);
       }

    }

    render() {
        let listArticles = null;
        if(this.props.isAuthenticated) {
            listArticles = (
                <div className={[bulma['container'], bulma['columns'], bulma['is-multiline'], classes.Articles].join(' ')}>
                    {
                        this.props.articles.map(article => (
                            <Article key={article._id} article={article} />
                        ))
                    }
                </div>
            )
        }

        return (
            <div>
                {listArticles}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        articles: state.articles.articles,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticlesHandler: (token) => dispatch(actions.fetchArticles(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);