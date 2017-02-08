export function resource_request(args) {
	let {model, request} = args;
	let {dispatch} = model;
	console.log("DISPATCHING REQUEST: ", request);
	return new Promise((resolve,reject) => {
		dispatch({
			type: "RESOURCE.HTTP",
			request: request,
			cb: (json, response) => {
				resolve({json, response});
			}
		})
	})
}

export function resource_request_create(args) {
	let {model, resource, attributes} = args;
	return resource_request({
		model,
		request: {
			type: "create",
			resource,
			json: {
				data: {
					type: resource,
					attributes,
				}
			}
		}
	})
}
