const Deku = require('deku')

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
        state = state || {
            current: options.defaultRoute,
            history: [],
        };

        switch(action.type) {
            case options.type+".push":
				current = {
					uri: action.uri,
					props: action.props,
				} 
				window.history.pushState(current, "", "#!/"+current.uri);
                state = {
                    current,
                    history: [
                        state.current,
                        ...state.history.slice(0, options.maxHistory-1), // -1 for the line above
                    ]
                };
                break;
            case options.type+".pop":
                state = {
                    current: state.history[0],
                    history: state.history.slice(1), // -1 for the line above
                }
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


export default Router;
export {
    Router,
    Route,
    reducer,
    get_redirectors,
}
