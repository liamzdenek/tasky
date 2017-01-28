import Deku, {element, createApp} from 'deku'
import {createStore} from 'redux'
import reducer from './reducer'

import {setup_router} from 'components/RouterSingleton'
import App from 'components/App'

// Create a Redux store to handle all UI actions and side-effects
//let store = createStore(reducer())

let store = createStore(reducer(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Create an app that can turn vnodes into real DOM elements
let render = createApp(document.body, store.dispatch)

console.log("STORE: ", store);

setup_router(store.dispatch);

// Update the page and add redux state to the context
function draw() {
	render(
		<App/>,
		this.getState()
	);
}

draw.call(store);

store.subscribe(function() {
	draw.call(store);
})
