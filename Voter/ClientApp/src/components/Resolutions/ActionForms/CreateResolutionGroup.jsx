import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ResolutionMethods from '../../../Helpers/ResolutionMethods';
import SingleNewResolution from '../Details/SingleNewResolution';

class CreateResolutionGroup extends Component {

    constructor(props) {
        super(props);
        this.ResMethods = new ResolutionMethods();
        this.state = {
            resolutions: [{
                title: '',
                description: '',
                expirationDate: new Date()
            }],
            isSubmitDisabled: false,
            errors: [{ Title: [''], Description: [''], ExpirationDate: [''] }]
        };

    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.resolutions.length>0) {
            this.ResMethods.createResolutionGroup(
                this.state.resolutions
            ).then((res) => {
                NotificationManager.success('Resultions added', 'Correct');
                this.props.addNewResolution();
                this.props.history.push('/resolutions');
            }).catch((err) => {
                NotificationManager.error('Unsuccessful operation', 'Error!');
                this.handleInputErrors(err.response.data);
            });
        }
        else {
            NotificationManager.error('Add resolutions', 'Error!');
        }
    }

    addNewResolution = () => {
        console.log(this.state.errors);

        this.setState({
            resolutions: [...this.state.resolutions, {
                title: '',
                description: '',
                expirationDate: new Date()
            }], errors: [...this.state.errors, [{ Title: [''], Description: [''], ExpirationDate: [''] }]]
        })

    }

    handleInputErrors = (errors) => {
        let errorList = this.state.errors.map(() => {
            return [{ Title: [''], Description: [''], ExpirationDate: [''] }];
        })
        errors.forEach((error) => {
            var errorData = error.propertyName.split('.');
            var propertyName = errorData[1];
            var errorMessage = error.errorMessage;
            var errorIndex = errorData[0].split('')[2];
            errorList[errorIndex][propertyName] = [errorMessage];
        })
        this.setState({ errors: errorList });
    }

    handleInputChange = (index, event) => {
        let resolutionList = this.state.resolutions;
        resolutionList[index][event.target.name] = event.target.value;

        this.setState({ resolutions: resolutionList });
    }

    handleDateChange = (index, date) => {
        let resolutionList = this.state.resolutions;
        resolutionList[index]['expirationDate'] = new Date(date.setHours(date.getHours() + 2));

        this.setState({ resolutions: resolutionList });
    }

    removeResolution = (index) => {
        let resolutionList = this.state.resolutions;
        let errorList = this.state.errors;
        errorList.splice(index, 1);
        resolutionList.splice(index, 1);
        this.setState({ resolutions: resolutionList, errors: errorList });
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary my-3" onClick={this.addNewResolution}>
                    Add resolution <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </button>
                <p>Number of resolutions: <span>{this.state.resolutions.length}</span></p>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    {this.state.resolutions.map((resolution, index) => (

                        <SingleNewResolution key={index}
                            resolution={resolution}
                            index={index}
                            errors={this.state.errors}
                            handleInputChange={this.handleInputChange}
                            handleDateChange={this.handleDateChange}
                            removeResolution={this.removeResolution}
                        />

                    ))}
                    <div className="form-row">
                        <input type="submit" value="Create resolutions" className="btn btn-large btn-block btn-primary" disabled={this.state.isSubmitDisabled} />
                        <input type="button" value="Cancel" className="btn btn-large btn-block btn-danger" onClick={() => { this.props.history.push('/resolutions') }} />
                    </div>
                </form>
            </div>
        );
    }
}


export default withRouter(CreateResolutionGroup);