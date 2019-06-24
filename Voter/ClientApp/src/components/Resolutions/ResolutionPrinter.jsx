import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Moment from 'react-moment';
import ResolutionPrint from './Details/ResolutionPrint';

class ResolutionPrintPage extends Component {
    renderResolution = () => {
        return this.props.resolutions.map((resolution, index) => {
            return (
                <ResolutionPrint key={index}
                    resolution={resolution} />
            )
        })
    }

    render() {
        return (
            <div className="votingListContainer">
                <h2>Voting card from <Moment format="YYYY-MM-DD">{this.props.resolutions[0].creationDate}</Moment></h2>
                <div className="votingPersonalData">
                    <p><span>First nad last name:</span> ...............................</p>
                    <p><span>Address:</span> ......................................................</p>
                </div>
                <div>
                    {this.renderResolution()}
                </div>
                <div className="votingSignature">
                    <div><span>........................................................</span></div>
                    <div><span>Signature</span></div>
                </div>
            </div>
        );
    }
}

class ResolutionPrinter extends Component {
    render() {
        const resolutionId = this.props.match.params.group_id;
        const resolutions = this.props.resolutions[resolutionId];
        return (
            <div>
                <ReactToPrint
                    trigger={() => <button className="btn btn-primary mt-3">Print this out</button>}
                    content={() => this.componentRef}
                />
                <ResolutionPrintPage resolutions={resolutions} ref={el => (this.componentRef = el)} />
            </div>
        );
    }
}

export default withRouter(ResolutionPrinter);
