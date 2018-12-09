import React, {Component} from 'react';

//import component
import Aux from '../Aux/Aux';



class Layout extends Component {
    render() {
        return (
            <Aux>
                {/* header */}
                <header>this is header</header>
                {/* banner */}
                <div>this is banner</div>
                <main>
                    {this.props.children}
                </main>
                {/* footer */}
                <footer>this is footer</footer>
            </Aux>
        )
    }
}

export default Layout;