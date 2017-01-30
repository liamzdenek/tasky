import {element} from 'deku'
import validator from 'validator';

export const Validators = {
	isEmail: ({value, push}) => {
		if(!validator.isEmail(value)) {
			push("This field does not contain a valid email address");
		}
	},
	required: ({value, push}) => {
		if(validator.isEmpty(value)) {
			push("This field cannot be empty");
		}
	}
}

const Form = {
	getFields: (model) => {
		let form = document.getElementById(model.path);
		let result = {};
		for(let i = 0; i < form.elements.length; i++) {
			let element = form.elements[i];
			result[element.name] = element.value;
		}
		return result;
	},
	errors: (model) => {
		let form = document.getElementById(model.path);
		let result = [];
		let validate = model.props.validate;
		console.log("VALIDATORS: ", validate);
		if(!validate) {
			return result;
		}
		for(let i = 0; i < form.elements.length; i++) {
			let element = form.elements[i];
			let validators = validate[element.name];
			if(!validators) {
				continue;
			}
			validators.forEach((validator,i) => {
				if(!element.name) {
					return;
				}
				let name = element.name;
				validator({
					element,
					form,
					model,
					result,
					name,
					value: element.value,
					push: (msg) => {
						result.push({
							name,
							msg,
							validator: validator.name,
						});
					}
				});
			})
			console.log("VALIDATE: ", validators, element);
				
		}
		return result;
	},
	onFormSubmit: (model) => ev => {
		ev.preventDefault();
		let errors = Form.errors(model);
		if(errors.length != 0) {
			console.log("GOT ERRORS: ", errors);
			model.dispatch({
				type: "FORM_STATE",
				name: model.props.name,
				state: errors,
			})
		} else {
			model.props.onSubmit(Form.getFields(model), ev);
		}
	},
	render: (model) => {
		console.log("MODEL: ", model);
		let form = <form id={model.path}>
			{model.children}
		</form>;
		console.log("EARLY FORM: ", form);
		form.attributes = Object.assign({}, form.attributes, model.props);
		form.attributes.onSubmit = Form.onFormSubmit(model);
		console.log("FORM: ", form);
		return form;
	}
};

export default Form;

export function reducer(state, action) {
	state = state || {};
	if(action.type == "FORM_STATE") {
		let add = {};
		add[action.name] = action.state;
		state = Object.assign({}, state, add);
	}
	if(action.type.startsWith("router.")){
		state = {};
	}
	return state;
}

export const FormStatus = {
	render: (model) => {
		let {context, props} = model;
		let errors = context.form[props.name];
		if(!errors || errors.length == 0) {
			return <div/>
		}
		let lis = [];
		errors.forEach((err_data) => {
			let field_name = err_data["name"] ? err_data["name"]+": " : "";
			let field_msg = err_data["msg"]
			lis.push(<li>{field_name}{field_msg}</li>)
		})
		console.log("LIs: ", lis);
		return <ul>{lis}</ul>;
	}
}

/*
export const FormFieldStatus = {
	render: (model) => {
		let {context, props} = model;
		let errors = context.form[props.formName];
		if(!errors || Object.keys(errors) == 0) {
			return <div/>
		}
		let field_errors = errors[props.fieldName];
		if(!field_errors) {
			return <div/>
		}
		let lis = field_errors.map((field,i) => {
			return <p>{{field.name}}</p>
		})
	}
}
*/
