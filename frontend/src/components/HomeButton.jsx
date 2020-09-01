import React from 'react';
import { Icon, withStyles } from '@material-ui/core';
import { Redirect, withRouter } from 'react-router-dom';

const classes = (theme) => ({
    root: {
        position: 'absolute',
        top: 25,
        left: 25,
        fontSize: '3em',
        cursor: 'pointer',
        color: theme.palette.primary.main,
        transition: '.3s',

        '&:hover': {
            color: theme.palette.primary.dark
        }
    }
});

class HomeButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toHome: false
        }
    }

    render() {
        const { classes } = this.props;

        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }

        return (
            <Icon onClick={() => this.props.history.push('/')} className={classes.root} > home</Icon>
        )
    }
}

export default withRouter(withStyles(classes)(HomeButton));