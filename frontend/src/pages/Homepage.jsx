import React from 'react';
import './Homepage.scss';
import Navbar from '../components/Navbar';
import { Typography, Button, TextField, withStyles, Icon } from '@material-ui/core';

const classes = (theme) => ({
    submitButton: {
        width: '100%',
        marginTop: 10
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

                <div className="footer-section" id="footer">
                    <div className="footer-first">
                        <div className="footer-info">
                            <Typography variant="h4">Get in touch</Typography>
                            <Typography variant="body1">lol get rekt iot we take your moni from bank account and use on reddit gold because we want karma and hamburger.</Typography>
                            <div className="info">
                                <aside className="wrapper"><Icon>email</Icon><p className="inf">@gmail.com</p></aside>
                                <aside className="wrapper"><Icon>location_on</Icon><p className="inf">Jeppis, Finland</p></aside>
                            </div>
                        </div>

                        <div className="footer-contact">
                            <div className="contact-section" id="contact">
                                <form className="contact-form">
                                    <Typography variant="h4">Contact us</Typography>
                                    <div className="contact-form-input-wrapper">
                                        <TextField label="Name" required variant="outlined" />
                                    </div>
                                    <div className="contact-form-input-wrapper">
                                        <TextField label="Email" required variant="outlined" />
                                    </div>
                                    <div className="contact-form-input-wrapper">
                                        <TextField multiline rows={4} rowsMax={6} label="Message" required variant="outlined" />
                                    </div>
                                    <Button className={classes.submitButton} size="large" variant="contained" color="secondary">Submit</Button>
                                </form>
                            </div>

                        </div>
                    </div>
                    <div className="original-footer">
                        <div className="infos">
                            <div className="footer-info">
                                <Typography variant="h4">Budget PLANNER</Typography>
                                <Typography variant="body1">LOREM IPSUM</Typography>
                            </div>
                            <div className="footer-about">
                                <Typography variant="h4">About us</Typography>
                                <Typography variant="body1">We are a budget planner website</Typography>
                            </div>
                            <div className="social-medias">

                            </div>
                        </div>
                        <div className="sections">
                            <Button className="section">HOME</Button>
                            <Button className="section">ABOUT</Button>
                            <Button className="section">HOW IT WORKS</Button>
                            <Button className="section">CONTACT</Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withStyles(classes)(Homepage);