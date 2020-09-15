import React from 'react';
import { BrowserRouter, Route, Switch, Link, withRouter, NavLink, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { UserContext } from '../UserContext';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Loader from '../components/Loader'
import Frontpage from './dasboard_pages/Frontpage';
import Calendar from './dasboard_pages/Calendar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Firebase from '../auth';
import Profile from './dasboard_pages/Profile';

// Icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';

const styles = (theme) => ({
    root: {
        display: 'flex'
    },
    dashboard: {
        'font-family': 'Roboto',
    },
    sidebar: {
        width: '25vw',
        height: '100vh',
        'box-shadow': '5px 2px 25px -1px rgba(0,0,0,0.1)'
    },
    namedisplay: {
        display: 'flex',
        'justify-content': 'center',
        'text-align': 'center',
        'padding-top': '3vh',
        'padding-bottom': '3vh',
        'flex-direction': 'column'
    },
    namedropdown: {
        display: 'flex',
        'align-items': 'center',
        margin: '0 auto',
        cursor: 'pointer',
        // height: '10px',
    },
    navtabs: {
        flexGrow: 1,
        display: 'flex',
        height: 224
    },
    tab: {
        transition: '.25s',
        borderColor: 'rgb(33, 150, 243)',

        '&:hover': {
            'background-color': 'rgba(33, 150, 243, .15)',
            color: '#000'
        },
    },
    'selected': {
        'background-color': 'rgba(33, 150, 243, .15)',
        'border-right': '6px solid rgb(33, 150, 243)',
        border: 'none',
        color: 'rgb(33, 150, 243)',
    },
    none: {
        display: 'none'
    },
    menuLink: {
        textDecoration: 'none',
        color: '#000'
    },
    content: {
        width: '100%'
    },
    selectCurrency: {
        margin: '20px auto',
        padding: '0 50px',
        bottom: '0',
        position: 'absolute'
    menuItem: {
        display: 'flex',
        'justify-content': 'space-between',
        textDecoration: 'none',
        color: '#000',
        width: '100%',
    },
    nameDropdownList: {
        width: '200px',
    }
})

export class Dashboard extends React.Component {
    static contextType = UserContext

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            anchorEl: null
        }
    }

    handleDropdown = (e) => {
        this.setState({ anchorEl: e.currentTarget })
    }

    handleClickAway = () => {
        this.setState({ anchorEl: null })
    }

    handleTabChange = (event, value) => {
        this.setState({ tabIndex: value })
    }

    logout = () => {
        new Firebase()
            .doSignOut()
            .then((res) => this.props.history.push('/'))
            .catch(err => console.log(err))
    }

    render() {
        let user = this.context
        const { tabIndex, anchorEl, config } = this.state
        const { classes } = this.props;

        if (user) {
            return (
                <ConfigContext.Provider value={{
                    config: config,
                    changeCurrency: (currency) => {
                        const configObj = {
                            currency: currency,
                            dateFormat: this.state.config.dateFormat
                        }
                        this.setState({ config: configObj });
                    },
                    changeDateFormat: (format) => {
                        const configObj = {
                            currency: this.state.config.currency,
                            dateFormat: format
                        }
                        this.setState({ config: configObj });
                    }
                }}>
                    <div className={classes.dashboard}>
                        <BrowserRouter>
                            <div className={classes.sidebar}>
                                <div className={classes.namedisplay}>
                                    <div className={classes.namedropdown} onClick={(e) => this.handleDropdown(e)}>
                                        <span>{user.displayName}</span>
                                        <ArrowDropDownIcon />
                                    </div>
                                    <Popper
                                        open={Boolean(anchorEl)}
                                        anchororigin={{
                                            vertical: 'bottom'
                                        }}
                                        anchorEl={anchorEl}>
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClickAway}>
                                                <MenuList id="menu-list-grow">
                                                    <MenuItem><NavLink className={classes.menuLink} to="/">Home</NavLink></MenuItem>
                                                    <MenuItem><Link className={classes.menuLink} to="/dashboard/profile">Profile</Link></MenuItem>
                                                    <MenuItem onClick={this.logout}>Log out</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Popper>

                                </div>
                                <Tabs
                                    value={tabIndex}
                                    onChange={this.handleTabChange}
                                    orientation="vertical"
                                    variant='fullWidth'
                                    className={classes.navtabs}
                                    classes={{
                                        indicator: classes.none
                                    }}>
                                    <Tab
                                        className={classes.tab}
                                        classes={{
                                            selected: classes.selected
                                        }}
                                        label="Frontpage"
                                        component={Link}
                                        to="/dashboard/frontpage" />
                                    <Tab
                                        label="calendar"
                                        className={classes.tab}
                                        classes={{
                                            selected: classes.selected
                                        }}
                                        component={Link}
                                        to="/dashboard/calendar" />
                                </Tabs>
                            </div>
                            <div className={classes.content}>
                                <Switch>
                                    <Route exact path="/dashboard">
                                        <Redirect to="/dashboard/frontpage" />
                                    </Route>
                                    <Route path="/dashboard/frontpage" component={Frontpage} />
                                    <Route path="/dashboard/calendar" component={Calendar} />
                                    <Route path="/dashboard/profile" component={Profile} />
                                </Switch>
                            </div>
                            <Tabs
                                value={tabIndex}
                                onChange={this.handleTabChange}
                                orientation="vertical"
                                variant='fullWidth'
                                className={classes.navtabs}
                                classes={{
                                    indicator: classes.none
                                }}>
                                <Tab
                                    className={classes.tab}
                                    classes={{
                                        selected: classes.selected
                                    }}
                                    label="Frontpage"
                                    component={Link}
                                    to="/dashboard/frontpage" />
                                <Tab
                                    label="calendar"
                                    className={classes.tab}
                                    classes={{
                                        selected: classes.selected
                                    }}
                                    component={Link}
                                    to="/dashboard/calendar" />
                            </Tabs>
                            <Grid item xs={9} className={classes.content}>
                                <Switch>
                                    <Route path="/dashboard/frontpage" component={Frontpage} />
                                    <Route path="/dashboard/calendar" component={Calendar} />
                                    <Route path="/dashboard/profile" component={Profile} />
                                </Switch>
                            </Grid>
                        </BrowserRouter>
                    </div>
                </ConfigContext.Provider>
            )
        } else {
            return (<Loader />)
        }
    }
}

export default withRouter(withStyles(styles)(Dashboard))