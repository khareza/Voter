import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { ResolutionMethods} from '../../../Helpers/ResolutionMethods';
import DatePicker from 'react-datepicker';
import { Error } from '../../Error';

export class CreateResolution extends Component {
    constructor(props) {
        super(props);

        this.ResMethods = new ResolutionMethods();
        this.state = {
            title: '',
            resolutionNumber: '',
            description: '',
            expirationDate: new Date(),
            isSubmitDisabled: false,
            errors: {}
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
        }).catch((err) => {
            NotificationManager.error('Unsuccessful operation', 'Error!');
            this.handleInputErrors(err.response.data.errors);
        });

    }

    handleInputErrors = (errors) => {
        let errorsArray = [];
        for (var field in errors) {
            errorsArray[field] = errors[field];
        }
        this.setState({ errors: errorsArray });
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleDateChange = (date) => {
        this.setState({ expirationDate: date });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="headerLogin">
                        <h2 >Add new resolution</h2>
                    </div>
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">
                            <div className="form-group">
                                <label >Title</label>
                                <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/>
                                {this.state.errors['Title'] ? <Error messages={this.state.errors['Title']} /> : null}
                            </div>

                            <div className="form-group">
                                <label>Resolution Number</label>
                                <input className="form-control" type="text" name="resolutionNumber" value={this.state.resolutionNumber} onChange={this.handleInputChange}/>
                                {this.state.errors['ResolutionNumber'] ? <Error messages={this.state.errors['ResolutionNumber']} /> : null}
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                                {this.state.errors['Description'] ? <Error messages={this.state.errors['Description']} /> : null}
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
                                {this.state.errors['ExpirationDate'] ? <Error messages={this.state.errors['ExpirationDate']} /> : null}
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
