const {element} = require('deku')

import {Router, Route, redirect, redirect_now} from 'components/RouterSingleton';
import IndexPage from 'controllers/IndexPage';
import DashboardPage from 'controllers/DashboardPage';
import PageNotFoundPage from 'controllers/PageNotFoundPage';
import FirstLoginPage from 'controllers/FirstLoginPage';

let App = {
	render: ({context, dispatch}) => {
		return <Router router={context.router}>
			<Route match="/">
				<IndexPage/>
			</Route>
			<Route match="/dashboard">
				<DashboardPage/>
			</Route>
			<Route match="/first_login">
				<FirstLoginPage/>
			</Route>
            <Route match="*">
				<PageNotFoundPage/>
            </Route>
		</Router>
	}
}

export default App;
