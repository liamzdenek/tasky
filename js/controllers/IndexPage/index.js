const {element} = require('deku');
import {redirect, redirect_now} from 'components/RouterSingleton';
import {Dependencies} from 'components/Resource'
import Form, {FormStatus, Validators} from 'components/Form'
import PageWrap from 'controllers/PageWrap';
import Grid, {Col} from 'pure/Grids';
import A from 'pure/Buttons';

import Login from 'controllers/Login';
import Register from 'controllers/Register';

import css from './index.css'
const cond = require('util/conditions');

const IndexPage = {
	render: (model) => {
		let {dispatch} = model;
		let deps = new Dependencies(model);
		let user = deps.get(cond.logged_user).resolve();

		deps.done();

		if(user) {
			redirect_now(model, "/dashboard");
			return <div/>
		}

		let page;
		if(model.props.page == "register") {
			page = <div>
				<Register>
					<A onClick={redirect(model, "/", {page:"login"})}>Or, Log In</A>
				</Register>
			</div>
		} else {
			page = <div>
				<Login>
					<A onClick={redirect(model, "/", {page:"register"})}>Or, Register</A>
				</Login>
			</div>
		}
		return <PageWrap>
			<Grid class={css["modal-parent"]}>
				<Col fraction="1-3" class={css["modal"]}>
					{page}
				</Col>
			</Grid>
		</PageWrap>
	}
}
export default IndexPage;
