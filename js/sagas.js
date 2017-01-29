import { delay } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

export const BASE_URL = "http://localhost:3000";

export function* http_jsonapi(uri, init) {
    let myinit = {
        headers: {
            "Content-Type": "application/vnd.api+json",
        },
        body: init.json ? JSON.stringify(init.json) : null,
    }
    myinit = Object.assign(myinit, init);
    let response = yield fetch(uri, myinit);
	let body = yield response.text();
	return [response, JSON.parse(body)]
}

// Our worker Saga: will perform the async increment task
export function* http_login(action) {
	console.log("ACTION: ", action);
	let [response, data] = yield call(http_jsonapi, BASE_URL+'/session', {
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
	console.log("DATA: ", data);

	yield delay(1000)
	yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
	yield takeEvery('HTTP_LOGIN', http_login)
}

export default function* rootSaga() {
	yield [
		watchIncrementAsync()
	]
}
