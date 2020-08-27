import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './Navbar.scss';

const classes = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main
    },
    title: {
        flexGrow: 1,
        fontSize: 20
    },
});

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        window.addEventListener('scroll', () => {
            const navbarWrapperElement = document.querySelector('.Navbar-root-1');
            if (window.scrollY > 600) {
                navbarWrapperElement.style.height = '64px';
                navbarWrapperElement.classList.add('navbar-active');
            } else {
                navbarWrapperElement.style.height = '128px';
                navbarWrapperElement.classList.remove('navbar-active');
            }
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar className="navbar navbar-transparent" position="static">
                    <Toolbar>
                        <Typography variant="overline" className={classes.title}>
                            Budget planner
                        </Typography>
                        <Button href="/signup" color="inherit">Sign up</Button>
                        <Button href="/login" color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(classes)(Navbar);