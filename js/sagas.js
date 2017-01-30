import { delay } from 'redux-saga'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { setSession } from 'reducers/session'

import {BASE_URL} from 'util/config'

export function* http_jsonapi(uri, init) {
    let session = yield select((state) => state.session);
    let myinit = {
        headers: {
            "Content-Type": "application/vnd.api+json",
        },
        body: init.json ? JSON.stringify(init.json) : null,
    }
    if(session.token) {
        myinit.headers["Authorization"] = "Bearer "+session.token
    }

    myinit = Object.assign(myinit, init);
    let response = yield fetch(uri, myinit);
	let body = yield response.text();
	return [response, JSON.parse(body)]
}

// Our worker Saga: will perform the async increment task
export function* http_login(action) {
	console.log("ACTION: ", action);
	let [response, json] = yield call(http_jsonapi, BASE_URL+'/session', {
        method: 'POST',
        json: {
            data: {
                type: "session",
                attributes: {
                    email: action.email,
                    password: action.password,
                },
            }
        }
	})
    if(json.errors) {
        return;
    }
	console.log("JSON: ", json);


	yield setSession(put, json.data.id, json.data.relationships.logged_in_as.data.id);

    if(action.after) {
        action.after(response, json);
    }
}

export function* resource_require(action) {
    console.log("SAGA RESOURCE REQUIRE");
    return null;
}

export function* watch_http_login() {
	yield takeEvery('HTTP_LOGIN', http_login)
}

export function* watch_resource_require() {
	//yield takeEvery('RESOURCE_REQUIRE', resource_require)
}

export default function* rootSaga() {
	yield [
		watch_http_login(),
        watch_resource_require(),
	]
}
