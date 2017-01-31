import { call, put, select, takeEvery } from 'redux-saga/effects'
import {BASE_URL} from 'util/config'
import {http_jsonapi} from 'util/saga-http'
import {mountSaga} from 'sagas'
import {mountReducer} from 'reducer'
console.log("REDUCER: ", require('reducer'));

export function compareRequires(r1, r2) {
	console.log("COMPARING: ", r1, r2);
	return r1.type == r2.type &&
		r1.resource == r2.resource &&
		r1.id.every((v,i) => r2.id[i] == v)
}

export default function reducer(state, action) {
	state = state || {
		pending: [],
		cache: {},
	}

	if(action.type == "RESOURCE.REQUIRE") {
		let pending = state.pending || []; 

		pending = [
			action,
			...pending,
		]

		state = Object.assign({}, state, {pending}); 
	}
	else if(action.type == "RESOURCE.STORE") {
		console.log("REDUCER GOT MATCH: ", action);		
		let cache = Object.assign({}, state.cache ? state.cache[action.action.resource] : {});

		let rows = action.json.data;
		if(!Array.isArray(rows)) {
			rows = [rows];
		}
		if(action.json.include && Array.isArray(action.json.include)) {
			rows = rows.concat(action.json.include);
		}
		for(let i in rows) {
			let row = rows[i];
			let nobj = {};
			nobj[row.id] = row
			cache = Object.assign({}, cache, nobj)
		},

		let nstate = {};
		nstate[action.action.resource] = cache;
		state = Object.assign({}, state, nstate);
	}
	console.log("NEW STATE: ", state);
	return state;
}
mountReducer({resource: reducer});

/*

	{
		pending: [actions],
		cache: {
			[resourcename]: {
				[id]: {
					status: 'pending',
					expire: timestamp,
					record: [jsonapi record]
				}
			},
		},
	}

*/

/*
export function require(args) {
	args = Object.assign({
		type: "RESOURCE.REQUIRE",
	}, args);
	return args;
}
*/


function* watch_resource_require_ids(action) {
}

function* watch_resource_require(action) {
	let url = BASE_URL+'/'+action.resource+'/'+action.ids.join(',');
	if(action.related) {
		url += '?include='+action.related.join(',');
	}
	let [response, json] = yield call(http_jsonapi, url, {})
    console.log("ID REQUIRE RES: ", response, json);
    if(!json.data) {
        return;
    }
	return yield put({
		type: "RESOURCE.STORE",
		action,
		json,
	})
}

function* watch() {
	yield takeEvery('RESOURCE.REQUIRE', watch_resource_require)
}

mountSaga(watch);

export class Dependency {
	get instruction() { return this._instruction }
	set instruction(i) { this._instruction = i }
	constructor(instruction) {
		this.instruction = instruction;
	}
	or(cond) {
		console.log("TODO: OR COND");
		return this;
	}
	getDispatch() {
		return this.instruction;
	}
	resolve() {
		return this.instruction.get();
	}
	union(dep) {
		this.ids = this.ids.concatenate(dep.ids);
	}
}

export class Dependencies {
	get model() { return this._model }
	set model(m) { this._model = m }
	constructor(model) {
		this.model = model;
		this.deps = [];
	}
	get(args) {
		if(!args || typeof args != "function") {
			console.log("Dependencies cannot .get(args) where args= ", args);
			throw new Error("Dependencies cannot .get(args) where args= "+args);
		}
		let dep = new Dependency(args(this.model));
		this.deps.push(dep);
		return dep;
	}
	done() {
		let firable = [];
		for(let dep_i in this.deps) {
			let dep = this.deps[dep_i].getDispatch();
			let found = false;
			for(let tdep_i in firable) {
				let tdep = firable[tdep_i].getDispatch();
				if(
					tdep.type == dep.type &&
					tdep.resource == dep.resource
				) {
					firable[tdep_i].union(this.deps[dep_i]);
					found = true;
					break;
				}
			}
			if(!found) {
				firable.push(dep);
			}
		}
		console.log("FIRING: ", firable);
		firable.forEach((f) => {
			if(this.model.context.resource) {
				let pending = this.model.context.resource.pending;
				if(pending && pending.find((t) => compareRequires(f,t))) {
					return;
				}
			}

			console.log("Event has not been fired before");
			this.model.dispatch(f)
		});
	}
}
