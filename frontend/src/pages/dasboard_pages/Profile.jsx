import React from 'react';
import { withStyles, Icon, Typography, TextField, Button } from '@material-ui/core';
import Firebase from '../../auth';
import { Pie } from 'react-chartjs-2';

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
        fontSize: '12.5em',
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
    },
    pieChart: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    pieChartText: {
        marginBottom: '25px'
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
        const data = {
            labels: ["hello", "yes", "no", "dsajkld", "dkl", "jdalk"],
            datasets: [{
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 0.5
            }]
        }

        const options = {
            legend: {
                position: 'right'
            }
        }

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
                        <Typography className={classes.pieChartText} variant="h5">Summary</Typography>
                    </div>
                    <div className={`${classes.box} ${classes.side} ${classes.pieChart}`}>
                        <Typography className={classes.pieChartText} variant="h5">Text</Typography>
                        <Pie className={classes.chart} data={data} options={options} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(classes)(Profile);
