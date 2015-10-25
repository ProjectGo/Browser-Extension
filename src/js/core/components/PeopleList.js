import React, { Component, PropTypes } from 'react';

export default class PeopleList extends Component {
    render() {
        return (
            <ul>
                {this.props.list.map(user => <li>{user.toString()}</li>)}
            </ul>
        );
    }
}