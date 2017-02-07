import { call, put, select, takeEvery } from 'redux-saga/effects'

export default function* http_jsonapi(uri, init) {
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
