import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/Signup';
import Firebase from './auth';
import Homepage from './pages/Homepage';
import { UserContext } from './UserContext'
import AdditionalInfo from './pages/AdditionalInfo';
import { Typography, Button } from '@material-ui/core';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this.authListener()
    }

    authListener = () => {
        const firebase = new Firebase().firebase;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
            } else {
                this.setState({ user: null });
            }
        });
    }

    render() {
        const { user } = this.state;

        console.log(user);

        const PrivateRoute = ({ children, ...rest }) => {
            return (
                <Route
                    {...rest}
                    render={({ location }) =>
                        user ? (
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

        if (user) {
            return (
                <Router>
                    <UserContext.Provider value={user}>
                        <Switch>
                            <PrivateRoute path="/additional-info"><AdditionalInfo /></PrivateRoute>
                            <PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route exact path="/" component={Homepage} />
                            <Route exact path="*" component={NoMatch} />
                        </Switch>
                    </UserContext.Provider>
                </Router>
            )
        } else {
            return (
                <Router>
                    <UserContext.Provider value={user}>
                        <Switch>
                            <PrivateRoute path="/additional-info"><AdditionalInfo /></PrivateRoute>
                            <Route exact path="/dashboard"><Redirect to="/login" /></Route>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route exact path="/" component={Homepage} />
                            <Route exact path="*" component={NoMatch} />
                        </Switch>
                    </UserContext.Provider>
                </Router>
            );
        }
    }
}

function NoMatch() {
    let location = useLocation();

    return (
        <div className="no-match-wrapper">
            <Typography variant="h1">404</Typography>

            <Typography variant="h3">
                No match for <code>{location.pathname}</code>
            </Typography>

            <Button href="/" size="large" color="primary" variant="contained">home</Button>
        </div>
    )
}