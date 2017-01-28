const {element} = require('deku');
import {redirect, redirect_now} from 'components/RouterSingleton';

let Login = {
    render: ({context, dispatch}) => {
        return <div> 
            Hello Index
            <a onClick={redirect(dispatch, "/edit")}>To Edit</a>
        </div>
    }
}

export default Login;
