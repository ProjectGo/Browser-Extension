import React, { Component, PropTypes } from 'react';

export default class DecisionButton extends Component {
    render() {
        return (
            <a className="decision" href="#" onClick={(e) => this.handleClick(e)}>
                {this.props.name}
            </a>
        );
    }

    handleClick(e) {
        var self = this;

        chrome.storage.local.get('access_token', function (result) {
            self.props.onClick({ userID: 'self', access_token: result.access_token });
        });
    }
}