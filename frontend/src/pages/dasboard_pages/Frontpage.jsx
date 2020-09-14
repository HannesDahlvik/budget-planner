import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core';

const styles = (theme) => ({

    addPayDisplay: {
        width: '50%',
        height: '50%',
    },
    payDisplayItem: {
        // margin: '5px',
    }
})

class Frontpage extends Component {
    render() {
        const { classes } = this.props
        return (
            <Grid container justify-content="space-evenly" className={classes.addPayDisplay}>
                <Grid container align-items="center" justify-content="space-evenly" direction="row">
                    <Grid className="payDisplayItem" item>Add payment</Grid>
                    <Grid className="payDisplayItem" item>Add subscription</Grid>
                </Grid>
                <Grid container justify-content="space-evenly" direction="row">
                    <Grid align-items="center" className="payDisplayItem" item>Add pay</Grid>
                    <Grid className="payDisplayItem" item>Add salary</Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Frontpage)