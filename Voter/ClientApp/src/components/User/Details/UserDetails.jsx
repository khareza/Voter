import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';

export default class UserDetails extends Component {
    editUser = () => {
        this.props.editUser(this.props.user.id);
    }

    deleteUser = () => {
        this.props.handleDialogOpen(this.props.user.id);
    }

    render() {

        return (

            <div className="userCard">
                <div className="userCardHeader">
                    <p>{`${this.props.user.firstName} ${this.props.user.lastName}`}</p>
                    <p>Age: <Moment fromNow ago>{this.props.user.birthDate}</Moment></p>
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