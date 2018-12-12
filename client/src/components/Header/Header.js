import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import bulma from 'bulma'
import {connect} from 'react-redux';
import classes from './Header.scss'

class Header extends Component {
    clickHandleMenu = (e) => {
        let navBarMobile = document.getElementById('navbarBasicExample');
        navBarMobile.classList.toggle(bulma['is-active'])
    }

    render() {

        return (
            <nav className={[bulma["navbar"], classes.Nav].join(' ')} role="navigation" aria-label="main navigation">
                <div className={bulma["navbar-brand"]}>
                    <Link className={bulma["navbar-item"]} to="/">
                     <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </Link>
    
                    <a role="button" className={[bulma["navbar-burger"], bulma["burger"]].join(' ')} onClick={this.clickHandleMenu} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>
    
                <div id="navbarBasicExample" className={bulma["navbar-menu"]}>
                    <div className={bulma["navbar-end"]}>
                        <div className={bulma["navbar-item"]}>
                            {
                                !this.props.isAuthenticated ? (
                                    <div className={bulma["buttons"]}>
                                        <Link to="/register" className={[bulma["button"], bulma['is-primary'], classes.ButtonBase].join(' ')}>
                                            <span className={classes.ButtonBaseTitle}>Sign Up</span>
                                        </Link>
                                        <Link to="/login" className={[bulma["button"], bulma["is-light"], classes.ButtonBase].join(' ')}>
                                            <span className={classes.ButtonBaseTitle}>Log In</span>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className={bulma["buttons"]}>
                                        <Link to="/logout" className={[bulma["button"], bulma['is-primary'], classes.ButtonBase].join(' ')}>
                                            <span className={classes.ButtonBaseTitle}>Logout</span>
                                        </Link>
                                    </div>
                                )
                            } 
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}
export default connect(mapStateToProps)(Header);