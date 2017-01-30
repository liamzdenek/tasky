const {element} = require('deku')

import {Router, Route, redirect, redirect_now} from 'components/RouterSingleton';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';


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
                404 route not found
            </Route>
		</Router>
	}
}

export default App;
