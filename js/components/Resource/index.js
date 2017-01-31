import { call, put, select, takeEvery } from 'redux-saga/effects'
import {BASE_URL} from 'util/config'
import {http_jsonapi} from 'util/saga-http'
import {mountSaga} from 'sagas'
import {mountReducer} from 'reducer'

export default function reducer(state, action) {
	state = state || {}

	if(action.type == "RESOURCE.STORE") {
		console.log("REDUCER GOT MATCH: ", action);		
		let cache = Object.assign({}, state.cache ? state.cache[action.action.resource] : {});

		let rows = action.json.data;
		if(!Array.isArray(rows)) {
			rows = [rows];
		}
		for(let i in rows) {
			let row = rows[i];
			let nobj = {};
			nobj[row.id] = row
			cache = Object.assign({}, cache, nobj)
		}

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
		cache: {
			[resourcename]: {
				[id]: {
					expire: timestamp,
					record: [jsonapi record]
				}
			},
		},
	}

*/

export function require(args) {
	args = Object.assign({
		type: "RESOURCE.REQUIRE",
	}, args);
	return args;
}


function* watch_resource_require_ids(action) {
	let [response, json] = yield call(http_jsonapi, BASE_URL+'/'+action.resource+'/'+action.ids.join(','), {})
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

function* watch_resource_require(action) {
    console.log("GOT RESOURCE REQUIRE: ", action);
	if(action.kind == "ids") {
        return yield watch_resource_require_ids(action);
    } else {
        throw new Exception("Unknown resource require kind: "+action.kind);
    }
}

function* watch() {
	console.log("Watching");
	yield takeEvery('RESOURCE.REQUIRE', watch_resource_require)
}

mountSaga(watch);

