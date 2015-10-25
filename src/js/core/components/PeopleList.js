import React, { Component, PropTypes } from 'react';
import { avatars } from '../helpers/hacks';
import _ from 'lodash';

export default class PeopleList extends Component {
    render() {
        return (
            <ul>
                {this.props.list.map((user, key) => <li key={key}><img src={_.shuffle(avatars)[0]} /></li>)}
            </ul>
        );
    }
}