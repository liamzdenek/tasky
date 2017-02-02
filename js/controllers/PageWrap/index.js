const {element} = require('deku')
import {redirect, redirect_now} from 'components/RouterSingleton';
import {Dependencies} from 'components/Resource'
import css from './index.css';

const cond = require('util/conditions');


let PageWrap = {
	render: (model) => {
		let {dispatch, context, children} = model;

		let deps = new Dependencies(model);
		let user = deps.get(cond.logged_user).resolve();

		deps.done();

		console.log("PAGEWRAP CSS: ", css);
		console.log("PAGEWRAP CSS: ", css.header);

		return <div>
			<div class={css.header}>
				Header
			</div>
			<div class={css.content}>
				{children}
			</div>
		</div>
	}
}
export default PageWrap;
