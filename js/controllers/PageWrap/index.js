const {element} = require('deku')
import {redirect, redirect_now} from 'components/RouterSingleton';
import {Dependencies} from 'components/Resource'
import css from './index.css';
import Variable from 'components/Variable'

const cond = require('util/conditions');


let PageWrap = {
	render: (model) => {
		let {dispatch, context, children} = model;

		let deps = new Dependencies(model);
		let user = deps.get(cond.logged_user).resolve();
		let orgs = deps.get(cond.logged_user_orgs).resolve();

		deps.done()

		// todo: replace this with pure css
		let show_menu = new Variable(model, "show_menu", {default: false});

		return <div>
			<div class={css.header}>
				Header
				<div class={css.right+" "+css.box} onClick={() => {show_menu.value = !show_menu.value}}>
					<div class={css.letter}>
						{user.attributes.email.slice(0,1)}
					</div>
				</div>
			</div>
			{show_menu.value &&
				<div class={css.zeroheight} >
					<div class={css.right+" "+css.orgs}>
						{orgs.map((org) => {
							return <div class={css.org}>
								{org.attributes.name || "Internal Error getting org name"}
							</div>
						})}
					</div>
				</div>
				||
				<div/>
			}
			<div class={css.content}>
				{children}
			</div>
		</div>
	}
}
export default PageWrap;
