import React, { Component } from 'react';


export class UserDetails extends Component {
    
    editUser = () => {
        this.props.editUser(this.props.user);
    }

    deleteUser = () => {
        this.props.deleteUser(this.props.user.id);
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">
                            <div className="card border-success mb-3">
                                <div className="card-header">{`${this.props.user.firstName} ${this.props.user.lastName}`}</div>
                                <div className="card-body text-success">
                                    <h5 className="card-title">{`Email: ${this.props.user.email} Phone: ${this.props.user.phoneNumber}`}</h5>
                                    <p className="card-text">{`Address ${this.props.user.address}`}</p>
                                    <a className="btn btn-primary text-light" onClick={this.editUser}>Edit</a>
                                    <a className="btn btn-danger text-light" onClick={this.deleteUser}>Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
