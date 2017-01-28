import Deku, {element} from 'deku'

let Route = {
	render: ({children, props}) => {
		children.forEach((child) => {
			child.props = props;
		})
		if(children.length == 1) {
			return children[0];
		}
		return <div>{children}</div>
	}
}

function check_match(pattern, haystack) {
    // todo: this can be written a whoel lot better by splitting on star
    let curchar = pattern[0];
    for(let i = 0; i < pattern.length; curchar = pattern[++i]) {
        if(curchar == "*") {    
            return true;
        }
        if(curchar != haystack[i]) {
            return false;
        }
    }
    return pattern.length == haystack.length;
}

let Router = {
	render: ({children, props}) => {
		
		let route_i = children.findIndex((route, i) => check_match(route.props.match, props.router.current.uri))
		console.assert(route_i != -1, "Couldn't find matching route for: ", props.router.current.uri);
		let route = Object.assign({}, children[route_i]); // shallow clone
		route.props = Object.assign({}, props.router.current.props)
		return route;
	}
}

function reducer(options) {
    options = Object.assign({
        type: "router",
        defaultRoute: {
            uri: "/",
            props: {},
        },
        maxHistory: 100,
    }, options);
    
    return (state, action) => {
        if(!state) {
            let route = history.state
            if(window.location.hash) {
                route = {
                    uri: window.location.hash.slice(2),
                    props: {},
                }
            }
            route = route || options.defaultRoute;
            window.history.replaceState(route, "", "#!"+route.uri);
            state = {
                current: route,
            };
        }

        switch(action.type) {
            case options.type+".push":
				let current = {
					uri: action.uri,
					props: action.props,
				} 
				window.history.pushState(current, "", "#!"+current.uri);
                state = {
                    current,
                };
                break;
            case options.type+".afterpop":
                console.log("AFTERPOP STATE: ", action.state);
                state = {
                    current: action.state, 
                }
            case options.type+".pop":
                //window.history.back();
        }

        return state;
    }
}

function get_redirectors(prefix) {

	let redirect_now = (dispatch, uri, props={}) => {
        dispatch({
			type: prefix+'.push',
			uri: uri,
			props: props,
		})
	};
	return {
		redirect_now,
		redirect: (dispatch, uri, props) => event => redirect_now(dispatch, uri, props)
	}

}

function setup_router(prefix, dispatch) {
    window.onpopstate = function(ev) {
        console.log("POPSTATE EV: ", ev);
        dispatch({
            type: prefix+".afterpop",
            state: ev.state,
        })
    }
}

export default Router;
export {
    Router,
    Route,
    reducer,
    get_redirectors,
    setup_router,
}
