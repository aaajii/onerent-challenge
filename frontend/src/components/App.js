import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Lookup from './Lookup';

import '../styles/App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <main className="main-content">
                        <Switch>
                            <Route from="/" component={Lookup} />
                        </Switch>
                    </main>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
