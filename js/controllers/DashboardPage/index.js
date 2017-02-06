const {element} = require('deku')
import {redirect, redirect_now} from 'components/RouterSingleton';
import {Dependencies} from 'components/Resource'
import PageWrap from 'controllers/PageWrap'

const cond = require('util/conditions');

let Dashboard = {
	render: (model) => {
		let {dispatch, context} = model;

		let deps = new Dependencies(model);
		let user = deps.get(cond.logged_user).resolve();
		let orgs = deps.get(cond.logged_user_orgs).resolve();

		deps.done();

		if(!user) {
			redirect_now(model, "/");	
			return <div>Empty Page</div>;
		}

		if(!orgs || orgs.length == 0) {
			redirect_now(model, "/first_login");
			return <div>Create or join an org</div>;
		}

		return <PageWrap>Hello Dashboard {user.attributes.email} <br/> {JSON.stringify(orgs)}</PageWrap>
	}
}
export default Dashboard;
