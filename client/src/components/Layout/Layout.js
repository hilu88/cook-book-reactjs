import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';

import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component {
    render () {
        return (
            <Aux>
                <Toolbar />
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;