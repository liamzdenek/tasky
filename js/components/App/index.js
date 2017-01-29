const {element} = require('deku')

import {Router, Route, redirect, redirect_now} from 'components/RouterSingleton';
import Login from 'components/Login';



let App = {
	render: ({context, dispatch}) => {
		return <Router router={context.router}>
			<Route match="/">
                <Login/>
			</Route>
			<Route match="/edit">
				Hello Edit
			</Route>
		</Router>
	}
}

export default App;
