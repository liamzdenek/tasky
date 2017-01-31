import { combineReducers } from 'redux';    
import session from 'components/Session';

let router = require('components/RouterSingleton').reducer;
let form = require('components/Form').reducer;

export function mountReducer(add) {
    module.mounted = module.mounted || {};
    
    if(typeof add != "object" || add.constructor != Object) {
        console.error("Cannot mount a reducer that is not a plain object");
        return;
    }

    let keys = Object.keys(add);
    for(let i in keys) {
        if(module.mounted[keys[i]]) {
            console.error("Trying to mount a reducer with the same name twice: ", keys[i]);
        }
    }
    console.log("MOUNTING REDUCER: ", add);
    module.mounted = Object.assign(module.mounted, add);

}

export default function rootReducer() {
    console.log("INITIALIZED REDUCERS: ", module.mounted);
    return combineReducers(module.mounted)
}
