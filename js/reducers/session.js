export function setSession(dispatch, token, user_id) {
	return dispatch({
		type: "SESSION_SET",
		token: token,
		user_id: user_id,
	})
}

export default function reducer(state, action) {
	state = state || {};
	if(action.type == "SESSION_SET") {
		state = {
			token: action.token,
			user_id: action.user_id,
		}
	}
	return state;
}
