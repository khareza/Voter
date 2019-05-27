import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons'
import '../../../ComponentsStyles/UserDetails.css';

export class ResolutionDetails extends Component {

    editUser = () => {
        this.props.editUser(this.props.user);
    }

    deleteUser = () => {
        this.props.deleteUser(this.props.user.id);
    }

    render() {

        return (
            <div className="userCard">
                <div className="userCardHeader">
                    <p>{`${this.props.user.firstName} ${this.props.user.lastName}`}</p>
                    <p>Age: 18</p>
                </div>
                <div className="userData">
                    <div>
                        <p><span>Address: </span>{this.props.user.address}</p>
                        <p><span>Phone: </span>{this.props.user.phoneNumber}</p>
                        <p><span>Email: </span>{this.props.user.email}</p>
                    </div>
                    <div className="userButtons">
                        <a className="button buttonEdit" onClick={this.editUser}><FontAwesomeIcon icon={faUserEdit}></FontAwesomeIcon></a>
                        <a className="button buttonDelete" onClick={this.deleteUser}><FontAwesomeIcon icon={faUserTimes}></FontAwesomeIcon></a>
                    </div>
                </div>
            </div>
        );
    }
}