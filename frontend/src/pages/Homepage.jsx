import React from 'react';
import './Homepage.scss';
import Navbar from '../components/Navbar';
import { Typography } from '@material-ui/core';

export default class Homepage extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <div className="section">
                    <div className="skewed"></div>
                    <div className="big-ass-header">
                        <Typography variant="h3">our mission is to big money</Typography>
                    </div>
                </div>

                <div className="section">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos pariatur minima repellendus eaque illum accusantium porro magni veritatis alias odit illo provident earum, tenetur, quibusdam id magnam sunt consequuntur beatae minus soluta, nesciunt enim fugit. Tenetur reprehenderit illum, accusamus accusantium aperiam temporibus et quasi, recusandae necessitatibus mollitia velit alias dolore.</p>
                </div>
            </>
        )
    }
}