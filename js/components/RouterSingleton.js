import {mountReducer} from 'reducer'
const Router = require('components/Router');

console.log("ROUTER: ", Router);

let prefix = 'router';

let exports = Object.assign({}, Router, Router.get_redirectors(prefix));

exports.setup_router = exports.setup_router.bind(null, prefix);

module.exports = exports;

mountReducer({router: exports.reducer()});
