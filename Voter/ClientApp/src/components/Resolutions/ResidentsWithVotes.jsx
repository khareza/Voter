import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ResolutionMethods } from '../../Helpers/ResolutionMethods';
import { ResidentWithVote } from './Details/ResidentWithVote';
import { NotificationManager } from 'react-notifications';


class ResidentsWithVotes extends Component {


    constructor(props) {
        super(props);
        this.id = this.props.match.params.resolution_id;
        this.resolutionRequest = new ResolutionMethods();
        this.state = {
            residentsAndVotes:[]
        }
    }

    componentDidMount = () => {
        this.getResults();
    }

    getResults = () => {
        this.setState({ resultsReady: false });
        this.resolutionRequest.getResidentsWithVotes(this.id)
            .then((res) => {
                this.setState({
                    residentsAndVotes: res.data
                })
                console.log(res.data);
            }).catch(() => {
                NotificationManager.error('Server internal error', 'Error!');
                this.props.history.push(`/Resolutions/${this.id}`);
            })
    }

    renderComponents = () => {
        return this.state.residentsAndVotes.map((residentAndVote,index) => {
            return (
                <ResidentWithVote key={index} resident={residentAndVote.resident} vote={residentAndVote.vote}/>
            )
        })
    }

    handleBackPage = () => {
        this.props.history.push(`/resolutions/results/${this.id}`);
    }

    render() {
        return (
            <div>
                <div className="listHeader">
                    <h2>List of residents and their votes</h2>
                    <button className="btn btn-primary" onClick={this.handleBackPage}>Come back to resolution</button>
                    <div className="residentsWithVotesList">
                        {this.renderComponents()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ResidentsWithVotes);