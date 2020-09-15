import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
    container: {
        display: 'flex',
    }
})

class Frontpage extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <div>
                    add pay
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Frontpage)
