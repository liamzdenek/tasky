const {element} = require('deku');
import {redirect, redirect_now} from 'components/RouterSingleton';
import {Dependencies} from 'components/Resource'
import Form, {FormStatus, Validators} from 'components/Form'
import PageWrap from 'controllers/PageWrap';
import {Submit} from 'pure/Buttons';
import {Controls, AlignedInput} from 'pure/Forms'
import {register} from 'controllers/UserModel/Factory'

const ontryregister = model => (fields, ev) => {
	console.log("ON TRY REGISTER: ", fields);
	register(model, fields);
}

const Register = {
	render: (model) => {
        let {context, dispatch, path, children} = model;

		let validate = {
			"email": [Validators.isEmail],
			"password": [Validators.required],
		}

        return <div> 
            <h1>Register</h1>
			<FormStatus name="registerform"/>
            <Form onSubmit={ontryregister(model)} name="registerform" validate={validate} aligned>
				<fieldset>
					<AlignedInput label="Email" name="email" value="a@a.a"/>
					<AlignedInput label="Password" name="pw_hash" type="password" value="password"/>
                	<Controls>
						<Submit value="Register" primary/>
						{" "}
						{children}
					</Controls>
				</fieldset>
            </Form>
        </div>
	}
}
export default Register;
