import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        'flex-direction': 'row',
    },
    sidebar: {
        width: '23vw',
        height: '100vh',
        'box-shadow': '5px 2px 25px -1px rgba(0,0,0,0.1)',
    },
    tab: {
        position: 'relative',
    },
    'selected': {
        'background-color': '#2196F3',
        border: 'none',
        color: 'white',
    },
    none: {
        display: 'none'
    }
}));

export default function Sidebar(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    classes={{ indicator: classes.none }}
                    scrollButtons='off'
                    variant='fullWidth'
                >
                    {props.contentArr.map(item =>
                        <Tab classes={{ selected: classes.selected }} key={item.index} label={item.title} {...a11yProps(item.index)} />
                    )}
                </Tabs>
            </div>
            <div>
                {props.contentArr.map(item =>
                    <TabPanel key={item.index} value={value} index={item.index}>
                        {item.content}
                    </TabPanel>
                )}
            </div>
        </div>
    );
}
