const {element} = require('deku')
import {redirect, redirect_now} from 'components/RouterSingleton';

const cond = require('util/conditions');


let Dashboard = {
	onCreate: (model) => {
		cond.require_logged_user(model);
		cond.require_logged_user_orgs(model);
	},
	render: (model) => {
		let {dispatch, context} = model;

		if(cond.login(model)) { return <div/>; }

		return <div>Hello Dashboard 111</div>
	}
}
export default Dashboard;
