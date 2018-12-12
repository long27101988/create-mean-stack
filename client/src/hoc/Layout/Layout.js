import React, {Component} from 'react';

//import component
import Aux from '../Aux/Aux';
import Footer from '../../components/Footer/Footer'
// import Banner from '../../components/Banner/Banner'
import Header from '../../components/Header/Header'

import classes from './Layout.scss'



class Layout extends Component {
    render() {
        return (
            <Aux>
                {/* header */}
                <Header />
                {/* banner */}
                {/* <Banner /> */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                {/* footer */}
                <Footer/>
            </Aux>
        )
    }
}

export default Layout;