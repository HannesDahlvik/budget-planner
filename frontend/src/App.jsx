import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/Signup';

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
                                <Route path="/signup" component={SignUp} />
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
    isAuthenticated: false,
    authenticate(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};
