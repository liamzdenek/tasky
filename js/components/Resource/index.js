import { call, put, select, takeEvery } from 'redux-saga/effects'
import {BASE_URL} from 'util/config'
import {http_jsonapi} from 'util/saga-http'
import {mountSaga} from 'sagas'
import {mountReducer} from 'reducer'

export function compareRequires(r1, r2) {
	//console.log("COMPARING: ", r1, r2);
	return r1.type == r2.type &&
		r1.resource == r2.resource &&
		r1.ids.every((v,i) => r2.ids[i] == v)
}

export default function reducer(state, action) {
	state = state || {
		pending: [],
		completed: [],
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
	else if(action.type.startsWith("router.")) {
		state = Object.assign({}, state, {completed: []})
	}
	else if(action.type == "RESOURCE.STORE") {
		if(state.pending) {
			let i = state.pending.findIndex((p) => compareRequires(p, action.action));
			let pending = [
				...state.pending.slice(0,i),
				...state.pending.slice(i+1)
			]

			let completed = state.completed || []; 
			
			completed = [
				action.action,
				...completed,
			]

			state = Object.assign({}, state, {pending}, {completed});
		}

		let rows = action.json.data;
		if(!Array.isArray(rows)) {
			rows = [rows];
		}
		if(action.json.included && Array.isArray(action.json.included)) {
			rows = rows.concat(action.json.included);
		}
		let cache = Object.assign({}, state.cache)
		rows.forEach((row) => {
			let resource_name = row.type;
			let resource_cache = Object.assign({}, state.cache ? state.cache[resource_name] : {});
			resource_cache[row.id] = row;
			
			if(resource_cache[row.id]) {
				resource_cache[row.id].relationships = Object.assign({}, resource_cache[row.id].relationships, row.relationships)
			}

			let ncache = {};
			ncache[resource_name] = resource_cache;
			cache = Object.assign({}, cache, ncache);
		})
		state = Object.assign({}, state, {cache});
		/*
		for(let i in rows) {
			let row = rows[i];
			let nobj = {};
			nobj[row.id] = row
			if(cache[row.id]) {
				nobj[row.id].relationships = Object.assign({}, cache[row.id].relationships, row.relationships)
			}
			cache = Object.assign({}, cache, nobj)
		}

		let nstate = Object.assign({}, state.cache);
		nstate[action.action.resource] = cache;
		state = Object.assign({}, state, {cache: nstate});
		*/
	}
	return state;
}
mountReducer({resource: reducer});

function* watch_resource_require(action) {
	let url = BASE_URL+'/'+action.resource+'/'+action.ids.join(',');
	if(action.include) {
		url += '?include='+action.include.join(',');
	}
	let [response, json] = yield call(http_jsonapi, url, {})
    //console.log("ID REQUIRE RES: ", response, json);
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
	get get() {
		if(this._get) { return this._get }
		if(!this.instruction) { return null }
		return this._get = this.instruction.get();
	}
	constructor(instruction) {
		this.instruction = instruction;
	}
	or(cond) {
		console.log("TODO: OR COND");
		return this;
	}
	getDispatch() {
		if(Array.isArray(this.get) && this.get.length == 0) {
			return this.instruction;
		}
		if(this.get != null) {
			return null;
		}
		return this.instruction;
	}
	resolve() {
		return this.get;
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
		let result = args(this.model);
		if(result === undefined || result === null) {
			return new Dependency(null);
		}
		if(!args || typeof args != "function") {
			console.log("Dependencies cannot .get(args) where args= ", args);
			throw new Error("Dependencies cannot .get(args) where args= "+args);
		}
		let dep = new Dependency(result);
		this.deps.push(dep);
		return dep;
	}
	done() {
		let firable = [];
		//console.log("TRYING TO FIRE: ", this.deps);
		for(let dep_i in this.deps) {
			let dep = this.deps[dep_i].getDispatch();
			if(!dep) {
				if(dep === null) {
					continue;
				}
				throw new Error("getDispatch() returned an empty value: "+dep);
			}
			let found = false;
			/*
			for(let tdep_i in firable) {
				let tdep = firable[tdep_i];
				if(
					tdep.type == dep.type &&
					tdep.resource == dep.resource &&
					tdep
				) {
					firable[tdep_i].union(this.deps[dep_i]);
					found = true;
					break;
				}
			}
			*/
			if(!found) {
				firable.push(dep);
			}
		}
		//console.log("FIRING: ", firable);
		let all_completed = true;
		firable.forEach((f) => {
			if(this.model.context.resource) {
				let union;
				let pending = union = this.model.context.resource.pending || [];
				
				let completed = this.model.context.resource.completed;
				if(completed) {
					union = pending.concat(completed);
				}
				if(union.find((t) => compareRequires(f,t))) {
					return;
				}
			}
			all_completed = false;

			//console.log("Event has not been fired before");
			this.model.dispatch(f)
		});
		return all_completed;
	}
}

export function relatedQuery({model, resource, id, path="", isSingular=false}) {
	let cache = model.context.resource.cache;
	if(!cache) {
		return null;
	}
	let output = [];
	let queue = [];
	if(id != null) {
		queue.push({
			resource,
			id,
			path: path.split('.'),
		})
	} else {
		if(cache[resource]) {
			for(let id in cache[resource]) {
				queue.push({
					resource,
					id,
					path: path.split('.'),
				})
			}
		}
	}

	while(queue.length) {
		let next = queue.shift();
		let resource_cache = cache[next.resource];
		if(!resource_cache) { continue; }
		let record = cache[next.resource][next.id];
		if(!record) { continue; }
		console.log("RECORD: ", record);
		
		if(next.path.length == 0 || (next.path.length == 1 && next.path[0] == "")) {
			output.push(record);
		} else {
			let rel = record.relationships[next.path[0]] 
			if(!rel.data) { continue; }
			let links = rel.data;
			let path = next.path.slice(1)
			if(!Array.isArray(links)) { links = [links]; } 
			links.forEach(function(link) {
				queue.push({
					resource: link.type,
					id: link.id,
					path,
				})
			})
		}
	}
	if(isSingular) {
		return output.length > 0 ? output[0] : null;
	}
	return output;
}












