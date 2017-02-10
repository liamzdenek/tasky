const {element} = require('deku')
import {redirect, redirect_now} from 'components/RouterSingleton';
import PageWrap from 'controllers/PageWrap'
import {Dependencies} from 'components/Resource'
const cond = require('util/conditions');

const FirstLoginPage = {
	render: (model) => {
		let deps = new Dependencies(model);
		let user = deps.get(cond.logged_user).resolve();

		if(!deps.done()) { return <div/> }

		if(!user) {
			redirect_now(model, "/");
			return <div/>
		}
		return <PageWrap disabled>
			First Login TODO
		</PageWrap>
	}
}
export default FirstLoginPage;
