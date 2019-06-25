import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { Error } from '../../Error';

export default class SingleNewResolution extends Component {

    handleInputChange = (event) => {
        this.props.handleInputChange(this.props.index, event)
    }

    handleDateChange = (date) => {
        this.props.handleDateChange(this.props.index, date)
    }


    render() {
        const errors = this.props.errors[this.props.index];
        return (
            <div className="singleResolution">
                <div className="form-gorup col-md-8 offset-md-2">
                    <div className="form-group">
                        <label >Title</label>
                        <input className="form-control" type="text" name="title" value={this.props.resolution.title} onChange={this.handleInputChange} />
                        {errors['Title'] ? <Error messages={errors['Title']} /> : null}
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input className="form-control" type="text" name="description" value={this.props.resolution.description} onChange={this.handleInputChange} />
                        {errors['Description'] ? <Error messages={errors['Description']} /> : null}
                    </div>

                    <div className="form-group">
                        <label>Expiration Date</label>
                        <div>
                            <DatePicker
                                selected={this.props.resolution.expirationDate}
                                onChange={this.handleDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                            />
                        </div>
                        {errors['ExpirationDate'] ? <Error messages={errors['ExpirationDate']} /> : null}
                    </div>
                </div>
                <div className="deleteResolutionButton">
                    <button type="button" className="btn btn-danger" onClick={() => {this.props.removeResolution(this.props.index)}}>Delete</button>
                </div>
            </div>
        );
    }
}