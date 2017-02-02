const {element} = require('deku')

import {Router, Route, redirect, redirect_now} from 'components/RouterSingleton';
import Login from 'controllers/Login';
import Dashboard from 'controllers/Dashboard';


let App = {
	render: ({context, dispatch}) => {
		return <Router router={context.router}>
			<Route match="/">
                <Login/>
			</Route>
			<Route match="/dashboard">
				<Dashboard/>
			</Route>
            <Route match="*">
				golly gee willikers, looks like you've taken a wrong turn!!!!
				liiks like our army of busy little worker bees must have  filed the page you were looking for in
				the wrong filing cabinet!!!! mayhaps you could try looking at one of our other many pages? ?? i
				am sure you would find something else you would like instead?? SO sorry you did not find
				what you were looking for !! may the force be with you fellow geek! :3 :3 :3
            </Route>
		</Router>
	}
}

export default App;
