const {element} = require('deku');
import {redirect, redirect_now} from 'components/RouterSingleton';
import {Dependencies} from 'components/Resource'
import Form, {FormStatus, Validators} from 'components/Form'
import PageWrap from 'controllers/PageWrap';
import {Submit} from 'pure/Buttons';
import {Controls, AlignedInput} from 'pure/Forms'
import {login} from 'components/Session/Factory';

const ontrylogin = model => (fields, ev) => {
	return login(model, fields);
}

let Login = {
    render: (model) => {
        let {context, dispatch, path, children} = model;

		let validate = {
			"email": [Validators.isEmail],
			"password": [Validators.required],
		}

        return <div> 
            <h1>Login</h1>
			<FormStatus name="loginform"/>
            <Form onSubmit={ontrylogin(model)} name="loginform" validate={validate} aligned>
				<fieldset>
					<AlignedInput label="Email" name="email" value="test2@test.com"/>
					<AlignedInput label="Password" name="password" type="password" value="testaroo" />
					<Controls>
						<Submit value="Login" primary/>
						{" "}
						{children}
					</Controls>
				</fieldset>
            </Form>
        </div>
    }
}

export default Login;
