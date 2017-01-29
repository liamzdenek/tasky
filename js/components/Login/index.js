const {element} = require('deku');
import {redirect, redirect_now} from 'components/RouterSingleton';
//import {BASE_URL} from 'sagas';
import Form, {FormStatus, Validators} from 'components/Form'

console.log("FORM STATUS: ", FormStatus);

const ontrylogin = model => (fields, ev) => {
	let {email, password} = fields;
    let {path, dispatch} = model;
    dispatch({
        type: "HTTP_LOGIN",
        email,
        password,
    })
}


let Login = {
    render: (model) => {
        let {context, dispatch, path} = model;
		let validate = {
			"email": [Validators.isEmail],
			"password": [Validators.required],
		}
        return <div> 
            <h1>Login</h1>
			<FormStatus name="loginform"/>
            <Form onSubmit={ontrylogin(model)} name="loginform" validate={validate}>
                Email: <input value="test@test.com" name="email"/>
                Password: <input value="password" type="password" name="password"/>
                <input type="submit" value="Login"/>
            </Form>
        </div>
    }
}

export default Login;
