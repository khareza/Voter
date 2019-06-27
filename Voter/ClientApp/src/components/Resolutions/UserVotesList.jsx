import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import ResolutionMethods from '../../Helpers/ResolutionMethods';
import UserVoteCard  from './Details/UserVoteCard';

class UserVotesList extends Component {


    constructor(props) {
        super(props);
        this.id = this.props.match.params.resolution_id;
        this.resolutionRequest = new ResolutionMethods();
        this.state = {
            residentsAndVotes: [],
            isContentLoaded: false
        }
    }

    componentDidMount = () => {
        this.getResults();
    }

    getResults = () => {
        this.setState({ isContentLoaded: false });
        this.resolutionRequest.getResidentsWithVotes(this.id)
            .then((res) => {
                this.setState({
                    residentsAndVotes: res.data,
                    isContentLoaded: true
                })
            }).catch(() => {
                NotificationManager.error('Server internal error', 'Error!');
                this.props.history.push(`/Resolutions/${this.id}`);
            })
    }

    renderComponents = () => {
        return this.state.residentsAndVotes.map((residentAndVote,index) => {
            return (
                <UserVoteCard key={index} resident={residentAndVote.resident} vote={residentAndVote.vote}/>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="listHeader">
                    <h2>List of residents and their votes</h2>
                    <button className="btn btn-primary" onClick={() => { this.props.handleBackPage(this.id) }}>Come back to resolution</button>
                    <div className="residentsWithVotesList">
                        
                        {this.state.isContentLoaded
                            ? this.renderComponents()
                            : <div className="spinner"></div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UserVotesList);