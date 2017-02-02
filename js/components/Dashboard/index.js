const {element} = require('deku')
import {redirect, redirect_now} from 'components/RouterSingleton';
import {Dependencies} from 'components/Resource'

const cond = require('util/conditions');


let Dashboard = {
	render: (model) => {
		let {dispatch, context} = model;

		let deps = new Dependencies(model);
		let user = deps.get(cond.logged_user).resolve();
		let orgs = deps.get(cond.logged_user_orgs).resolve();

		deps.done();

		if(!user) { return <div>Empty Page</div>; }

		if(!orgs) { return <div>Create or join an org</div>; }

		return <div>Hello Dashboard {user.attributes.email} <br/> {JSON.stringify(orgs)}</div>
	}
}
export default Dashboard;
