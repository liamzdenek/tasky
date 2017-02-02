const {element} = require('deku');
import {redirect, redirect_now} from 'components/RouterSingleton';
//import {BASE_URL} from 'sagas';
import Form, {FormStatus, Validators} from 'components/Form'

const cond = require('util/conditions');

console.log("FORM STATUS: ", FormStatus);

const ontrylogin = model => (fields, ev) => {
	let {email, password} = fields;
    let {path, dispatch} = model;
    dispatch({
        type: "HTTP_LOGIN",
        email,
        password,
        after: (response, json) => {
            if(json.errors) {
                return;
            }
            redirect_now(dispatch, "/dashboard");
        }
    })
}


let Login = {
    render: (model) => {
        let {context, dispatch, path} = model;
		if(cond.logout(model)) { return <div/> }
		let validate = {
			"email": [Validators.isEmail],
			"password": [Validators.required],
		}
        return <div> 
            <h1>Login</h1>
			<FormStatus name="loginform"/>
            <Form onSubmit={ontrylogin(model)} name="loginform" validate={validate}>
                <div>Email: <input value="test2@test.com" name="email"/></div>
                <div>Password: <input value="testaroo" type="password" name="password"/></div>
                <input type="submit" value="Login"/>
            </Form>
        </div>
    }
}

export default Login;
