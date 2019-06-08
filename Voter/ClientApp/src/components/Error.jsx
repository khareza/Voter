import React, { Component } from 'react';

export class Error extends Component {

    render() {
        return (
            <div className="error">
                {
                    this.props.messages.map((message, index) => (
                        <p key={index}>{message}</p>
                    ))
                }
            </div>
        )
    }
}