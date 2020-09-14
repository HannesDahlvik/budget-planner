import React from 'react';
import { Button, Divider, withStyles } from '@material-ui/core';
import Firebase from '../Firebase';
import ErrorHandler from '../ErrorHandler';
import { withRouter } from 'react-router-dom';

const classes = theme => ({
    otherAuthWrapper: {
        marginTop: 25,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    divider: {
        width: '46%',
        margin: '0 10px'
    },
    otherAuth: {
        marginTop: 25
    },
    icon: {
        fontSize: 42
    },
    buttonText: {
        color: '#fff',
        marginLeft: 15
    }
});

const fire = new Firebase();

class OtherAuth extends React.Component {
    constructor(props) {
        super(props);
    }

    async doLoginWithGoogle() {
        await fire.doSignInWithGoogle().catch(err => new ErrorHandler(err.message));
        this.props.history.push('/dashboard');
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.otherAuthWrapper}>
                <div className="other-auth-or">
                    <Divider className={classes.divider} />
                    <p>OR</p>
                    <Divider className={classes.divider} />
                </div>
                <div className={classes.otherAuth}>
                    <Button onClick={() => this.doLoginWithGoogle()} className="other-auth-icon other-auth-icon-google" variant="contained" size="large"><i className="fab fa-google other-auth-icon other-auth-icon-google"></i><p className={classes.buttonText}>Log in with Google</p></Button>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(classes)(OtherAuth));
