import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { UserContext } from '../UserContext';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Loader from '../components/Loader'
const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    dashboard: {
        'font-family': 'Roboto',
        display: 'flex',
        'flex-direction': 'row',
    },
    sidebar: {
        width: '23vw',
        height: '100vh',
        'box-shadow': '5px 2px 25px -1px rgba(0,0,0,0.1)',
    },
    namedisplay: {
        'text-align': 'center',
        'padding-top': '3vh',
        'padding-bottom': '3vh',
    },
    navtabs: {
        flexGrow: 1,
        display: 'flex',
        height: 224,
    },
    tab: {
        '&:hover': {
            'background-color': theme.palette.primary.main,
            color: 'white'
        },
    },
    'selected': {
        'background-color': theme.palette.primary.main,
        border: 'none',
        color: 'white',
    },
    none: {
        display: 'none'
    },
})

export class Dashboard extends React.Component {
    static contextType = UserContext

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        }
    }

    handleTabChange = (event, value) => {
        this.setState({ tabIndex: value })
        console.log(value);
    }

    render() {
        let user = this.context
        user = user.user
        const { tabIndex } = this.state
        const { classes } = this.props;

        if (user) {
            return (
                <div className={classes.dashboard}>
                    <BrowserRouter>
                        <div className={classes.sidebar}>
                            <div className={classes.namedisplay}>
                                {user.displayName}
                            </div>
                            <Tabs value={tabIndex} onChange={this.handleTabChange} orientation="vertical" variant='fullWidth' className={classes.navtabs}
                                classes={{ indicator: classes.none }}
                            >
                                <Tab className={classes.tab} classes={{ selected: classes.selected }} label="Frontpage" component={Link} to="/dashboard/frontpage" />
                                <Tab label="test" className={classes.tab} classes={{ selected: classes.selected }} component={Link} to="/dashboard/test" />
                            </Tabs>
                        </div>
                        <div className={classes.content}>
                            <Switch>
                                <Route path="/dashboard/frontpage" component={frontpage} />
                                <Route path="/dashboard/test" component={test} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </div>
            )
        } else {
            return (<Loader />)
        }
    }
}

const frontpage = () => {
    return (
        <div>
            frontpage content
        </div>
    )
}

const test = () => {
    return (
        <div>
            test content
        </div>
    )
}


export default withStyles(styles)(Dashboard)