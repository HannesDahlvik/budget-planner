import React from 'react';
import './Homepage.scss';
import Navbar from '../components/Navbar';
import { Typography, Button, TextField, withStyles } from '@material-ui/core';

const classes = (theme) => ({
    textField: {
        'border-color': '#fff'
    }
});

class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <Navbar />
                <div className="section">
                    <div className="skewed"></div>
                    <div className="home-header">
                        <Typography variant="h3">Our mission is to make you SAVE big money</Typography>
                        <Typography variant="subtitle1">Made from poor student(s) from ukraine</Typography>
                        <div className="home-header-buttons">
                            <Button href="/dashboard" variant="contained">dashboard</Button>
                            <Button variant="outlined" color="inherit">Donate</Button>
                        </div>
                    </div>
                </div>

                <div className="about-section page-section" id="about">
                    <Typography variant="h4">About</Typography>
                    <Typography variant="body1">Budget Planner is made for you to see how much money you could save. Basically you just enter a sum how much you make in a month and enter how much you approximately spend in a month.</Typography>
                </div>

                <div className="how-it-works-section" id="works">

                </div>

                <div className="contact-section" id="contact">
                    <form className="contact-form">
                        <Typography variant="h4">Contact us</Typography>
                        <div className="contact-form-input-wrapper">
                            <TextField className={classes.textField} label="Name" required variant="outlined" />
                        </div>
                        <div className="contact-form-input-wrapper">
                            <TextField className={classes.textField} label="Email" required variant="outlined" />
                        </div>
                        <div className="contact-form-input-wrapper">
                            <TextField multiline rowsMax={6} className={classes.textField} label="Message" required variant="outlined" />
                        </div>
                        <Button size="large" variant="contained" color="secondary">Submit</Button>
                    </form>
                </div>
            </>
        )
    }
}

export default withStyles(classes)(Homepage);