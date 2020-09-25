import React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Firebase from '../../Firebase';
import ErrorHandler from '../../ErrorHandler';
import Loader from '../../components/Loader'
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

//Icons
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
    fullHeight: {
        height: '100%',
        position: 'absolute',
        top: '0',
        right: '0'
    },
    trashCan: {
        cursor: 'pointer',
    }
})

const fire = new Firebase();
class Paylist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            payments: null
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        fire.getData()
            .then((data) => {
                let paylistData = []
                for (let i = 0; i < data.length; i++) {
                    const dataObj = {
                        title: data[i].title,
                        type: data[i].type,
                        date: data[i].date,
                        amount: data[i].amount,
                        id: data[i].id
                    }
                    paylistData.push(dataObj)

                }
                this.setState({
                    payments: paylistData
                })

            }).catch(err => new ErrorHandler(err.message))
    }

    createData(payment, type, cost, date, id) {
        return { payment, type, cost, date, id };
    }

    deleteData(id, type) {
        fire.deleteData(id, type)
        this.getData()
    }

    render() {
        const { classes } = this.props
        const { payments } = this.state


        if (payments) {
            if (payments.length) {
                let rows = []

                for (let i = 0; i < payments.length; i++) {
                    let event = payments[i]
                    console.log(event)

                    rows[i] = [
                        this.createData(event.title, event.type, event.amount, event.date, event.id)
                    ]
                }
                return (
                    <>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Payment</TableCell>
                                        <TableCell align="right">Type</TableCell>
                                        <TableCell align="right">Cost&nbsp;</TableCell>
                                        <TableCell align="right">Date&nbsp;</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row[0].payment}>
                                            <TableCell component="th" scope="row">
                                                {row[0].payment}
                                            </TableCell>
                                            <TableCell align="right">{row[0].type}</TableCell>
                                            <TableCell align="right">{row[0].cost}</TableCell>
                                            <TableCell align="right">{row[0].date}</TableCell>
                                            <TableCell align="center" ><DeleteIcon className={classes.trashCan} onClick={() => this.deleteData(row[0].id, row[0].type)} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )
            } else {
                return (<>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Payment</TableCell>
                                    <TableCell align="right">Type</TableCell>
                                    <TableCell align="right">Cost&nbsp;</TableCell>
                                    <TableCell align="right">Date&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>

                        </Table>
                    </TableContainer>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.fullHeight}
                        xs={9} lg={10}
                    >
                        No payments found.
                    </Grid>
                </>)
            }
        } else {
            return (<Loader />)
        }
    }
}

export default withStyles(styles)(Paylist)