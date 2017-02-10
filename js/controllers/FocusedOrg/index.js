import {mountReducer} from 'reducer'
import {relatedQuery} from 'components/Resource'

export function getFocusedOrg(model) {
	let {context} = model;
	if(context.focusedorg && context.focusedorg.id) {
		return relatedQuery({
			model,
			resource: "orgs",
			isSingular: true,
			ids: [context.focusedorg.id],
		})
	}
	
	let org = relatedQuery({
		model,
		resource: "orgs",
		isSingular: true,
	})
	//console.log("RELATEDQUERY ORG: ", org);
	return org;
}

export function getFocusedOrgId(model) {
	let org = getFocusedOrg(model);
	if(!org){ return null; }
	return org.id;
}

export function setFocusedOrgById(model, id) {
	let {dispatch} = model;
	return dispatch({
		type: "FOCUSEDORG.SET",
		id,
	})
}

export default function reducer(state, action) {
	state = state || {}

	if(action.type == "FOCUSEDORG.SET") {
		state = { id: action.id };
	}

	return state;
}
mountReducer({focusedorg: reducer});
