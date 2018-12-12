import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Articles from '../../components/Articles/Articles'
import Aux from '../../hoc/Aux/Aux'
import Banner from '../../components/Banner/Banner'
import classes from './Home.scss'
import {connect} from 'react-redux'

class Home extends Component {

    render() {
        let articleList = (
            <div>
                <p>Please <strong><Link to="/login">Login</Link></strong> to show list article!!!</p>
            </div>
        );

        if(this.props.isAuthenticated) {
            articleList = <Articles />
        }

        return (
            <Aux>
                <div>
                    <Banner />
                </div>
                <div className={classes.ListArticle}>
                    {articleList}
                </div>
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}
export default connect(mapStateToProps)(Home);