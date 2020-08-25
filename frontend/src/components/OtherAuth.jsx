import React from 'react';
import { Button, Divider, withStyles } from '@material-ui/core';

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
    }
});

class OtherAuth extends React.Component {
    doLoginWithGoogle() {
        console.log('google auth');
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
                    <Button onClick={this.doLoginWithGoogle} className="other-auth-icon other-auth-icon-google" variant="contained" size="large"><i className="fab fa-google other-auth-icon other-auth-icon-google"></i></Button>
                </div>
            </div>
        );
    }
}

export default withStyles(classes)(OtherAuth);
