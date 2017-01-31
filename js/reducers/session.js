export function setSession(dispatch, token, user_id) {
	return dispatch({
		type: "SESSION_SET",
		token: token,
		user_id: user_id,
	})
}

export default function reducer(state, action) {
	state = state || { // || {}
		token: "123e4567-e89b-12d3-a456-426655440000",
		user_id: 1,
	};
	if(action.type == "SESSION_SET") {
		state = {
			token: action.token,
			user_id: action.user_id,
		}
	}
	return state;
}
