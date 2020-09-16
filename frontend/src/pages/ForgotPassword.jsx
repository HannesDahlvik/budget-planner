import React from "react";
import { TextField, Container, TableCell, withStyles, Button, Typography } from '@material-ui/core';
import { Redirect, withRouter, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Firebase from '../Firebase';

const classes = (theme) => ({
    form: {
        margin: theme.spacing(20, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    input: {
        margin: theme.spacing(5, 0)
    }
})

class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    async forgotPassword(e) {
        e.preventDefault()
        const fire = new Firebase()

        await fire.doForgetPassword(this.state.email)
    }

    render() {

        const { classes } = this.props
        return (
            <>

                <Container className={classes.container} component="main" maxWidth="xs">
                    <div className={classes.form}>
                        <Typography component="h1" variant="h5">
                            Forgot Password?
                        </Typography>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => this.setState({
                                email: e.target.value
                            })} />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => this.forgotPassword(e)}
                        >
                            Send
                        </Button>
                    </div>
                </Container>
            </>
        )
    }
}

export default withRouter(withStyles(classes)(ForgotPassword))