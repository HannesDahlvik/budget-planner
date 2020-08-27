import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/Signup';
import Firebase from './auth';
import Homepage from './pages/Homepage';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                </Switch>
            </Router>
        );
    }
}

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                new Firebase().isAuthed() ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}
