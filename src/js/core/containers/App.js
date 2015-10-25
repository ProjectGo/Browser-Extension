import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { go, no } from '../actions';
import PeopleList from '../components/PeopleList';
import DecisionButton from '../components/DecisionButton';

class App extends Component {
    render() {
        const { dispatch, go:goList, no:noList, maybe:maybeList } = this.props;

        return (
            <div>
                <h1>Идут:</h1>
                <PeopleList list={goList} />
                <h1>Не идут:</h1>
                <PeopleList list={noList} />
                <h1>Думают:</h1>
                <PeopleList list={maybeList} />
                <br/><br/>
                <p>а сам куда сядешь</p><br/>
                <DecisionButton  onClick={nextFilter => dispatch(go(nextFilter))} name="пики"/><br />
                <DecisionButton  onClick={nextFilter => dispatch(no(nextFilter))} name="пошути-ка мне тут" />
            </div>
        );
    }
}
function select(state) {
    return state;
}

export default connect(select)(App);