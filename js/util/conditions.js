import {http_jsonapi} from 'sagas'
import {redirect, redirect_now} from 'components/RouterSingleton';

import {BASE_URL} from 'util/config'

export function login({context, dispatch}) {
	if(!context.session || !context.session.token) {
		setTimeout(() => redirect_now(dispatch, "/"), 10);
		return true;
	}
	return false;
}

export function require_logged_user({context, dispatch}) {
	let expire = Date.now();
	expire += 60*60*1000; // +1 hr
	console.log("SENDING RESOURCE REQUIRE");
	setTimeout(() => {
		dispatch({
			type: "RESOURCE_REQUIRE",
			resource: "users",
			kind: "ids",
			ids: [context.session.user_id],
			expire,
		})
	}, 1);
}

export function require_logged_user_orgs({}) {

}
