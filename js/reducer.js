import { combineReducers } from 'redux';    

let router = require('components/RouterSingleton').reducer;

function counter(type) {
    return (state, action) => {
        state = state || 0;
        if(action.type == type) {
            state = state + 1
        }
        return state;
    }
}

export default function() {
    return combineReducers({
        counter: counter("CLICKED"),
		router: router(),
    })
}
