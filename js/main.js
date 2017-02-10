import Deku, {element, createApp} from 'deku'
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'

import {setup_router} from 'components/RouterSingleton'
import App from 'controllers/App'

import saga from './sagas'
import createSagaMiddleware from 'redux-saga'

import createLogger from 'redux-logger'

// Create a Redux store to handle all UI actions and side-effects
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
		sagaMiddleware,
		//loggerMiddleware
	),
);

sagaMiddleware.run(saga);

const action = type => store.dispatch({type})

// Create an app that can turn vnodes into real DOM elements
let render = createApp(document.body, store.dispatch)

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
	console.log(
		"%c"+ "Re-Rendering -- State: ",
		"color: orange;font-weight: bold;",
		store.getState(),
	)
	draw.call(store);
})
