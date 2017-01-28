const Router = require('components/Router');

console.log("ROUTER: ", Router);

let exports = Object.assign({}, Router, Router.get_redirectors('router'));

module.exports = exports;
