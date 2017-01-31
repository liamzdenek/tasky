const {element} = require('deku')
import {redirect, redirect_now} from 'components/RouterSingleton';
import {Dependencies} from 'components/Resource'

const cond = require('util/conditions');


let Dashboard = {
	render: (model) => {
		let {dispatch, context} = model;

		let deps = new Dependencies(model);
		let user = deps.get(cond.logged_user).resolve();
		//let orgs = deps.get(cond.logged_user_orgs).or(cond.goto_logout).resolve();

		deps.done();

		if(!user || !orgs) { return <div>Empty Page</div>; }

		return <div>Hello Dashboard {context.resource.users["1"].attributes.email}</div>
	}
}
export default Dashboard;
