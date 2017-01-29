const {element} = require('deku');
import {redirect, redirect_now} from 'components/RouterSingleton';
//import {BASE_URL} from 'sagas';

const ontrylogin = model => ev => {
    ev.preventDefault();
    let {path, dispatch} = model;
    let email = document.getElementById(path+"-email").value
    let password = document.getElementById(path+"-password").value;
    console.log("EMAIL PW: ", email, password);
    dispatch({
        type: "HTTP_LOGIN",
        email,
        password,
    })
}


let Login = {
    render: (model) => {
        let {context, dispatch, path} = model;
        console.log("MODEL: ", model);
        return <div> 
            Login
            <form onSubmit={ontrylogin(model)}>
                Email: <input id={path+"-email"}/>
                Password: <input type="password" id={path+"-password"}/>
                <input type="submit"  value="Login"/>
            </form>
        </div>
    }
}

export default Login;
