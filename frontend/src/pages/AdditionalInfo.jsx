import React from 'react';
import {
    Container,
    CssBaseline,
    Avatar,
    Typography,
    TextField,
    Button,
    withStyles
} from '@material-ui/core';
import HomeButton from '../components/HomeButton';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Firebase from '../Firebase';
import { withRouter } from 'react-router-dom';
import ErrorHandler from '../ErrorHandler';

const classes = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    center: {
        textAlign: 'center'
    }
});

const fire = new Firebase()

class AdditionalInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    doUpdateUsername(e) {
        e.preventDefault()
        if (this.state.username !== '') {
            fire.auth.currentUser.updateProfile({ displayName: this.state.username })
                .then(() => this.props.history.push('/dashboard'))
                .catch(err => new ErrorHandler(err.message))
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <HomeButton />

                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Additional info
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={e => this.setState({ username: e.target.value })}
                            />
                            <Typography variant="body1" className={classes.center}>Username can be changed later on.</Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={e => this.doUpdateUsername(e)}
                            >
                                Log in
                            </Button>
                        </form>
                    </div>
                </Container>
            </>
        );
    }
}

export default withRouter(withStyles(classes)(AdditionalInfo));
