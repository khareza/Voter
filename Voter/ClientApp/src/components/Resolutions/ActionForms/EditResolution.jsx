import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { ResolutionMethods } from '../../../Helpers/ResolutionMethods';
import DatePicker from 'react-datepicker';
import { Error } from '../../Error';
import Dialog from '../../DialogBoxes/DialogBox';
import DialogBackdrop from '../../DialogBoxes/DialogBackdrop';

class EditResolution extends Component {
    constructor(props) {
        super(props);
        this.ResMethods = new ResolutionMethods();
        this.id = this.props.match.params.resolution_id;
        this.state = {
            id: '',
            title: '',
            description: '',
            expirationDate: new Date(),
            isSubmitDisabled: false,
            errors: {},
            dialogOpen: false
        };
    }

    componentDidMount = () => {
        this.getResolution();
    }

    getResolution = () => {
        this.ResMethods.getResolutionById(this.id)
            .then((res) => {
                this.setState({
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description,
                    isSubmitDisabled: false,
                })
            })
    }

    getResolutionByIdFromDb = (id) => {
        return
    }


    handleSubmit = () => {
        let { id, title, description, expirationDate } = this.state;

        this.ResMethods.editResolution(
            { id, title, description, expirationDate }
        ).then((res) => {
            NotificationManager.success('Edit Successful', 'Correct');
            this.props.setEditedResolution(this.id, { id, title, description, expirationDate });
            this.props.history.push('/resolutions')
        }).catch((err) => {
            NotificationManager.error('Unsuccessful resolution edit', 'Error!');
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
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.setDialogConfig({
                        acceptedAction: () => { this.handleSubmit() }, message: "Edit"
                    })
                }} autoComplete="off">
                    <div className="formHeader">
                        <h2>Edit resolution</h2>
                    </div>
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">
                            <div className="form-group">
                                <label >Title</label>
                                <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                                {this.state.errors['Title'] ? <Error messages={this.state.errors['Title']} /> : null}
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

                            <input type="submit" value="Edit user data" className="btn btn-large btn-block btn-info" disabled={this.state.isSubmitDisabled} />

                            <input type="button" value="Cancel" className="btn btn-large btn-block btn-danger" onClick={() => { this.props.history.push('/resolutions') }} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditResolution);