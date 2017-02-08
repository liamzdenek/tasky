import {resource_request_create} from 'components/Resource/Factory';
import {setSession} from './index.js'

const RESOURCE = "session";

export function login(model, fields) {
	console.log("CALLING RESOURCE_REQUEST LOGIN");
	return resource_request_create({
		model,
		resource: RESOURCE,
		attributes: fields,
	}).then(({json, response}) => {
		if(json.errors) {
			console.log("TODO FORM ERRORS: ", json, response);
			return;
		}
		setSession(model, json.data.id, json.data.relationships.logged_in_as.data.id);
	})
}
