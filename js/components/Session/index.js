import { call, put, select, takeEvery } from 'redux-saga/effects'
import {BASE_URL} from 'util/config'
import {http_jsonapi} from 'util/saga-http'
import {mountSaga} from 'sagas'
import {mountReducer} from 'reducer'

export function getSessionToken({context}) {
	return context.session.token;
}

export function getSessionUserId({context}) {
	return context.session.user_id;
}

export function setSession(dispatch, token, user_id) {
	return dispatch({
		type: "SESSION.SET",
		token: token,
		user_id: user_id,
	})
}

export default function reducer(state, action) {
	state = state || { // || {}
		token: "123e4567-e89b-12d3-a456-426655440000",
		user_id: "1",
	};
	if(action.type == "SESSION.SET") {
		state = {
			token: action.token,
			user_id: action.user_id,
		}
	}
	return state;
}
mountReducer({session: reducer});

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

export function* watch() {
	yield takeEvery('HTTP_LOGIN', http_login)
}

mountSaga(watch);
