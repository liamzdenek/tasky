import {Router, Route, redirect, redirect_now} from 'components/RouterSingleton';

const {element} = require('deku')

let App = {
	render: ({context, dispatch}) => {
		console.log("APP SENDING HELLO WORLD");
		return <Router router={context.router}>
			<Route match="/">
				Hello Index
				<a onClick={redirect(dispatch, "/edit")}>To Edit</a>
			</Route>
			<Route match="/edit">
				Hello Edit
			</Route>
		</Router>
	}
}

export default App;
