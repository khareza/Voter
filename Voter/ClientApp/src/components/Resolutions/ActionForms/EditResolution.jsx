import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import AuthMethods from '../../../Helpers/AuthMethods';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class EditResolution extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();

        this.state = {
            title: this.props.resolutionToEdit.title,
            resolutionNumber: this.props.resolutionToEdit.resolutionNumber,
            description: this.props.resolutionToEdit.description,
            expirationDate: new Date(),
            isSubmitDisabled: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { title, resolutionNumber, description, expirationDate } = this.state;

        this.Auth.editResolution(
            { id: this.props.resolutionToEdit.id, title, resolutionNumber, description, expirationDate }
        ).then((res) => {
            NotificationManager.success('Edit Successful', 'Correct');

            this.props.history.push('/resolutions')
        }).catch((err) => {
            NotificationManager.error('Unsuccessful resolution edit', 'Error!', 5000, () => {
            });
        });
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        //this.checkIfFormDataIsValid();
    }

    //checkIfFormDataIsValid = () => {
    //    if (this.state.userName.length > 0 && this.state.firstName.length > 0) {
    //        this.setState({ isSubmitDisabled: false });
    //    }
    //    else {
    //        this.setState({ isSubmitDisabled: true });
    //    }
    //}

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="headerLogin">
                        {this.props.resolutionToEdit.id ? <h2 >Edit resolution</h2> : <h2 >Select resolution</h2>}
                    </div>
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">
                            <div className="form-group">
                                <label >Title</label>
                                <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Resolution Number</label>
                                <input className="form-control" type="text" name="resolutionNumber" value={this.state.resolutionNumber} onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Expiration Date</label>
                                <div>
                                    <DatePicker
                                        selected={this.state.expirationDate}
                                        onChange={this.handleDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </div>
                            </div>

                            <input type="submit" value="Edit user data" className="btn btn-large btn-block btn-info" disabled={this.state.isSubmitDisabled} />

                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/resolutions') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditResolution);