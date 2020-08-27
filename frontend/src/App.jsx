import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    {
                        fakeAuth.isAuthenticated ?
                            <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                            </Switch>
                            :
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Redirect to="/login"></Redirect>
                            </Switch>
                    }
                </Switch>
            </Router>
        );
    }
}

const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};
