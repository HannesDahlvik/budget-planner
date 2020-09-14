import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import Firebase from '../auth';
import ErrorHandler from '../ErrorHandler';
import App from '../App';

const classes = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main
    },
    navlink: {
        color: '#fff',
        'text-decoration': 'none',
        marginRight: 50
    },
    title: {
        fontSize: 20
    },
    navbarLinks: {
        flexGrow: 1,
        justifyContent: 'space-evenly'
    },
    navbarLink: {
        margin: 'auto 10px'
    },
    rightLink: {
        margin: 'auto 10px'
    }
});

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        window.addEventListener('scroll', () => {
            const navbarWrapperElement = document.querySelector('.navbar-wrapper');

            if (window.scrollY > 150) {
                navbarWrapperElement.style.height = '64px';
                navbarWrapperElement.classList.add('navbar-active');
            } else {
                navbarWrapperElement.style.height = '128px';
                navbarWrapperElement.classList.remove('navbar-active');
            }
        });
    }

    componentDidMount() {
        this.authListener();
    }

    doLogout() {
        new Firebase().doSignOut().catch(err => new ErrorHandler(err.message));
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

    scrollTo(element) {
        const el = document.getElementById(element);
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    render() {
        const { user } = this.state;
        const { classes } = this.props;

        return (
            <div className={`navbar-wrapper ${classes.root}`}>
                <AppBar className="navbar navbar-transparent" position="static">
                    <Toolbar>
                        <NavLink to="/" className={classes.navlink}>
                            <Typography variant="overline" className={classes.title}>Budget planner</Typography>
                        </NavLink>
                        <div className={classes.navbarLinks}>
                            <Button onClick={() => this.scrollTo('about')} className={classes.navbarLink} color="inherit">About</Button>
                            <Button onClick={() => this.scrollTo('works')} className={classes.navbarLink} color="inherit">How it works</Button>
                            <Button onClick={() => this.scrollTo('contact')} className={classes.navbarLink} color="inherit">Contact us</Button>
                        </div>
                        {user ? (
                            <>
                                <Button className={classes.rightLink} href="/dashboard" variant="outlined" color="inherit">Dashboard</Button>
                                <Button className={classes.rightLink} onClick={this.doLogout} variant="outlined" color="inherit">Logout</Button>
                            </>
                        ) : (
                                <>
                                    <Button className={classes.rightLink} href="/signup" variant="outlined" color="inherit">Sign up</Button>
                                    <Button className={classes.rightLink} href="/login" variant="outlined" color="inherit">Login</Button>
                                </>
                            )
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(classes)(Navbar);