import React, { Component } from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, faHandPaper, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
export class ResidentWithVote extends Component {


    render() {
        var voteIcon = '';
        var votingCardClass = 'votingCard ';
        var voteIconStyle = 'voteIcon ';
        switch (this.props.vote) {
            case 'For':
                voteIcon = faCheck;
                votingCardClass += 'voteFor';
                voteIconStyle += 'voteIconFor'
                break;
            case 'Against':
                voteIcon = faBan;
                votingCardClass += 'voteAgainst';
                voteIconStyle += 'voteIconAgainst'
                break;
            case 'Hold':
                voteIcon = faHandPaper;
                votingCardClass += 'voteHold';
                voteIconStyle += 'voteIconHold'
                break;
            case 'Unsigned':
                voteIcon = faQuestionCircle;
                votingCardClass += 'voteUnsigned';
                voteIconStyle += 'voteIconUnsigned'
                break;
            default:
                votingCardClass += 'voteUnsigned';
                voteIconStyle += 'voteIconUnsigned'
                voteIcon = faQuestionCircle;
        }
        
        return (
            <div className={votingCardClass}>
                <div className="votingResidentData">
                    <p>{`${this.props.resident.firstName} ${this.props.resident.lastName}`}</p>
                    <p>Age: <Moment fromNow ago>{this.props.resident.birthDate}</Moment></p>
                </div>
                <div className={voteIconStyle}>
                        <FontAwesomeIcon icon={voteIcon}></FontAwesomeIcon>
                </div>
            </div>
        );
    }
}