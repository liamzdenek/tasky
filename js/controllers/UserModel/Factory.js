import {resource_request_create} from 'components/Resource/Factory';
import {login} from 'components/Session/Factory';

const RESOURCE = "users";

export function register(model, fields) {
	return resource_request_create({
		model,
		resource: RESOURCE,
		attributes: fields,
	}).then(({json, response}) => {

		if(json.errors) {
			console.log("TODO FORM ERRORS: ", json, response);
			return;
		}
		return login(model, {username: fields.username, password: fields.pw_hash})
	})
}
