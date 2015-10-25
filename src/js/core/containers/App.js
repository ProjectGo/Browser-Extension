import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { go, no } from '../actions';
import PeopleList from '../components/PeopleList';
import DecisionButton from '../components/DecisionButton';

// если я в списке да или нет - дизейблить кнопки

class App extends Component {
    render() {
        const { dispatch, go:goList, no:noList, maybe:maybeList } = this.props;

        return (
            <div>
                <p>Идем гулять на петроградке, сейчас.</p>
                <DecisionButton  onClick={nextFilter => dispatch(go(nextFilter))} name="Я иду!"/>
                <DecisionButton  onClick={nextFilter => dispatch(no(nextFilter))} name="Не сегодня." />
                <h1>Идут:</h1>
                <PeopleList list={goList} />
                <h1>Не идут:</h1>
                <PeopleList list={noList} />
                <h1>Думают:</h1>
                <PeopleList list={maybeList} />
            </div>
        );
    }
}

export default connect(state => state)(App);