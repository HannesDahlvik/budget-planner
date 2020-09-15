import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/Signup';
import Firebase from './Firebase';
import Homepage from './pages/Homepage';
import { UserContext } from './UserContext'
import { Typography, Button } from '@material-ui/core';
import Loader from './components/Loader'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            readyToRender: false
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
            this.setState({ readyToRender: true })
        });
    }

    render() {
        const { user, readyToRender } = this.state;
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
        if (readyToRender) {
            console.log(user);
            if (user) {
                return (
                    <Router>
                        <UserContext.Provider value={user}>
                            <Switch>
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
        } else {
            return (<Loader />)
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