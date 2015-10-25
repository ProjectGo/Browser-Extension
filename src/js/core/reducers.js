import { combineReducers } from 'redux';
import { GO, NO, MAYBE } from './actions';
import Immutable from 'immutable';

let init = {
    go: Immutable.List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    no: Immutable.List([4, 5, 6, 4, 5, 6, 3, 4, 3]),
    maybe: Immutable.List([7, 8, 3, 5, 6, 3, 5, 7, 4, 3, 5, 7, 4, 5, 9])
};

function statistics(state = init, action = MAYBE) {
    switch (action.type) {
        case GO:
            return {
                go: state.go.push(action.user.userID),
                no: state.no,
                maybe: state.maybe
            };
        case NO:
            return {
                go: state.go,
                no: state.no.push(action.user.userID),
                maybe: state.maybe
            };
        default:
            return state;
    }
}

export default statistics;