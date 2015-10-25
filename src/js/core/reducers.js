import { combineReducers } from 'redux';
import { GO, NO, MAYBE } from './actions';
import Immutable from 'immutable';

let init = {
    go: Immutable.List([1, 2, 3]),
    no: Immutable.List([4, 5, 6]),
    maybe: Immutable.List([7, 8, 9])
};

function statistics(state = init, action = MAYBE) {
    switch (action.type) {
        case GO:
            return {
                go: state.go.push(action.userID),
                no: state.no,
                maybe: state.maybe
            };
        case NO:
            return {
                go: state.go,
                no: state.no.push(action.userID),
                maybe: state.maybe
            };
        default:
            return state;
    }
}

export default statistics;