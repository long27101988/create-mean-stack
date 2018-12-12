import React, {Component} from 'react'
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux'
import * as actions from '../../store/actions/'
import classes from './ArticleDetail.scss'
import PropTypes from 'prop-types'

class ArticleDetail extends Component {

    componentDidMount() {
        this.props.fetchArticleById(this.props.token, this.props.match.params.id);
    }

    render() {
        let articleDetail = null


            if (this.props.article) {
                articleDetail = (
                    <div className={classes.ArticleDetail}>
                        <div className={classes.ArticleTitle}>
                            <div>
                            </div>
                            <h1>{this.props.article.name}</h1>
                        </div>
                        <div className={classes.ArticleContent}>
                            <p className={classes.GraphContent}>
                                {this.props.article.content}
                            </p>
                        </div>
                    </div>
                )
            }


        return (
            <Aux>
                {articleDetail}
            </Aux>
        )
    }
}



const mapStateToProps = state => {
    return {
        article: state.articles.article,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticleById: (token, id) => dispatch(actions.fetchArticleById(token,id)),
    }
};

ArticleDetail.propTypes = {
    article: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string
    })
};

ArticleDetail.defaultProps = {
    article: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);