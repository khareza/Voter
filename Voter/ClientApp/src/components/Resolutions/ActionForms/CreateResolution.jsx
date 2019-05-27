import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { ResolutionMethods} from '../../../Helpers/ResolutionMethods';
import DatePicker from 'react-datepicker';

export class CreateResolution extends Component {
    constructor(props) {
        super(props);

        this.ResMethods = new ResolutionMethods();
        this.state = {
            title: '',
            resolutionNumber: '',
            description: '',
            expirationDate: new Date(),
            isSubmitDisabled: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { title, resolutionNumber, description, expirationDate } = this.state;

        this.ResMethods.createResolution(
            { title, resolutionNumber, description, expirationDate }
        ).then(() => {
            NotificationManager.success('Resultions added', 'Correct');
            this.props.history.push('/resolutions');
        }).catch(() => {
            NotificationManager.error('Unsuccessful operation', 'Error!', 5000, () => {
            });
        });

        this.setState({
            title: '',
            resolutionNumber: '',
            description: '',
            expirationDate: new Date(),
            isSubmitDisabled: true
        });
    }



    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        //this.checkIfFormDataIsValid();
    }

    handleDateChange = (date) => {
        this.setState({ expirationDate: date });
    }

    //checkIfFormDataIsValid = () => {
    //    if (this.state.userName.length > 0 && this.state.password.length > 0) {
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
                        <h2 >Add new user</h2>
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
                            <input type="submit" value="Add new resolution" className="btn btn-large btn-block btn-primary" disabled={this.state.isSubmitDisabled} />
                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/resolutions') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
