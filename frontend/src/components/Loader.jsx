import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = makeStyles((theme) => ({
    root: {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
}))


export default function CircularIndeterminate() {
    const classes = style();

    return (
        <div className={classes.root}>
            <CircularProgress size={72} color="primary" />
        </div>
    );
}