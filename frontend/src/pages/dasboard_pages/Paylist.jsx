import React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Firebase from '../../Firebase';
import ErrorHandler from '../../ErrorHandler';

const styles = (theme) => {

}

class Paylist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [

            ]
        }
    }

    componentDidMount() {
        const fire = new Firebase();

        fire.getData()
            .then((data) => {
                let paylistData = []
                for (let i = 0; i < data.length; i++) {
                    const dataObj = {
                        title: data[i].title,
                        type: data[i].type,
                        date: data[i].date,
                        amount: data[i].amount
                    }
                    paylistData.push(dataObj)

                }
                this.setState({
                    events: paylistData
                })

            }).catch(err => new ErrorHandler(err.message))
    }

    createData(payment, type, cost, date) {
        return { payment, type, cost, date };
    }

    render() {

        let rows = []

        for (let i = 0; i < this.state.events.length; i++) {
            let event = this.state.events[i]
            console.log(event.date)

            rows[i] = [
                this.createData(event.title, event.type, event.amount, JSON.stringify(event.date))
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )

    }
}

export default Paylist