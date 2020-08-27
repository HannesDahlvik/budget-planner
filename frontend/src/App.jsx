import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/Signup';
import Firebase from './auth';
import Homepage from './pages/Homepage';
import { UserContext } from './UserContext'

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
        const firebase = new Firebase().firebase
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
            } else {
                this.setState({ user: null });
            }
        });
    }

    render() {
        const user = this.state
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
        return (
            <Router>
                <UserContext.Provider value={user}>
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={SignUp} />
                    </Switch>
                </UserContext.Provider>

            </Router>
        );
    }
}



//new Firebase().isAuthed()