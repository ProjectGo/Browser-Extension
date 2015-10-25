import React, { Component, PropTypes } from 'react';

export default class PeopleList extends Component {
    render() {
        return (
            <ul>
                {this.props.list.map((user, key) => <li key={key}>{user.toString()}</li>)}
            </ul>
        );
    }
}