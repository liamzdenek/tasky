import { call, put, select, takeEvery } from 'redux-saga/effects'
import {mountReducer} from 'reducer'

export default class Variable {
	//get model() { return this._model }
	//set model(m) { this._model = m }
	constructor(model, key, args) {
		this.model = model;
		this.key = key;
		this.args = args;
	}
	
	default() {
		return this.args.default;
	}

	get value() {
		if(this.cache) { return this.cache; }
		if(!this.model.context.variable[this.model.path]) { return this.default() }
		return this.model.context.variable[this.model.path][this.key] || this.default()
	}

	set value(v) {
		this.model.dispatch({
			type: "VARIABLE.SET",
			key: this.key,
			value: v,
			context: this.model.path,
		});
		this.cache = v;
		return v;
	}
}

export function reducer(state, action) {
	state = state || {}
	if(action.type == "VARIABLE.SET") {
		let new_key = {}
		new_key[action.key] = action.value;

		let new_context = Object.assign({}, state[action.context], new_key);

		let new_state = {}
		new_state[action.context] = new_context;

		state = Object.assign({}, state, new_state);
	}
	if(action.type.startsWith("router.")){
		state = {};
	}
	return state;
}
mountReducer({variable: reducer});
