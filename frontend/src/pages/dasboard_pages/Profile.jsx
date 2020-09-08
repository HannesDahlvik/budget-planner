import React from 'react';
import { withStyles, Icon, Typography, TextField, Button } from '@material-ui/core';
import Firebase from '../../auth';

const classes = (theme) => ({
    root: {
        display: 'grid',
        'grid-template-columns': 'repeat(2, 1fr)',
        'grid-template-rows': '1fr',
        'grid-column-gap': '20px',
        'grid-row-gap': '20px',
        padding: '100px 100px',
        width: '100%',
        height: '100%'
    },
    box: {
        float: 'left',
        backgroundColor: '#fff',
        'box-shadow': '5px 2px 25px -1px rgba(0,0,0,0.25)',
        padding: '25px'
    },
    side: {
        width: '100%',
        height: '100%'
    },
    height: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    infoPanel: {
        width: '100%',
        height: '100%'
    },
    rightPanel: {
        display: 'grid',
        'grid-template-columns': '1fr',
        'grid-template-rows': 'repeat(2, 1fr)',
        'grid-column-gap': '20px',
        'grid-row-gap': '20px'
    },
    accountCircle: {
        fontSize: '10em',
        marginBottom: '10px',
        color: '#333'
    },
    changerWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: '15px 0',
    },
    changeIcon: {
        marginLeft: '10px',
        cursor: 'pointer'
    },
    changeButton: {
        minWidth: 0,
        padding: '6px',
        margin: '0 10px'
    },
    redButton: {
        backgroundColor: '#ff0000',
        color: '#fff',

        '&:hover': {
            backgroundColor: '#dd0000',
            color: '#fff'
        }
    }
});

const fire = new Firebase();

class Profile extends React.Component {
    state = {
        showChangeUsername: false,
        username: ''
    }

    componentDidMount() {
        this.setState({ username: fire.auth.currentUser.displayName });
    }

    changeDisplayName = (e) => {
        e.preventDefault();

        fire.auth.currentUser.updateProfile({
            displayName: this.state.username
        });

        this.setState({ showChangeUsername: false });
    }

    render() {
        const { username } = this.state;
        const { classes } = this.props;

        return (
            <div className={`${classes.root} profile-page`}>
                <div className={classes.infoPanel}>
                    <div className={`${classes.box} ${classes.height}`}>
                        <Icon className={classes.accountCircle}>account_circle</Icon>
                        <div className={classes.changerWrapper}>
                            {this.state.showChangeUsername ? (
                                <>
                                    <form onSubmit={(e) => this.changeDisplayName(e)}>
                                        <Button className={`${classes.changeButton} ${classes.redButton}`} variant="contained" onClick={() => this.setState({ showChangeUsername: false })}><Icon>clear</Icon></Button>
                                        <TextField defaultValue={fire.auth.currentUser.displayName} onChange={(e) => this.setState({ username: e.target.value })} />
                                        <Button className={classes.changeButton} color="primary" variant="contained" onClick={this.changeDisplayName}><Icon>done</Icon></Button>
                                    </form>
                                </>
                            ) : (
                                    <>
                                        <Typography variant="h5">{username}</Typography>
                                        <Icon onClick={() => this.setState({ showChangeUsername: true })} className={classes.changeIcon}>create</Icon>
                                    </>
                                )}
                        </div>
                        <Typography variant="h5">{fire.auth.currentUser.email}</Typography>
                    </div>
                </div>
                <div className={`${classes.infoPanel} ${classes.rightPanel} profile-right-info-panel`}>
                    <div className={`${classes.box} ${classes.side}`}>

                    </div>
                    <div className={`${classes.box} ${classes.side}`}>

                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(classes)(Profile);
