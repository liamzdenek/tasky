const {element} = require('deku')
import {redirect, redirect_now} from 'components/RouterSingleton';
import {Dependencies} from 'components/Resource'
import css from './index.css';
import Variable from 'components/Variable'
import {setFocusedOrgById} from 'controllers/FocusedOrg'

const cond = require('util/conditions');

import Grid, {Col} from 'pure/Grids';
import Menu, {MenuList, MenuItem, MenuLink} from 'pure/Menus';

let PageWrap = {
	render: (model) => {
		let {dispatch, context, children} = model;

		let deps = new Dependencies(model);
		let user = deps.get(cond.logged_user).resolve();
		let orgs = deps.get(cond.logged_user_orgs).resolve();
		let focused_org = deps.get(cond.focused_org).resolve();

		let all_reqs_done = deps.done()

		console.log("PageWrap user: ", user);

		// todo: replace this with pure css
		let show_menu = new Variable(model, "show_menu", {default: false});

		let menuClick = () => {
			show_menu.value = !show_menu.value;
		}

		let menu = () => {
			return <MenuLink heading>
				{user ? focused_org ? focused_org.attributes.name : "[No Org Selected]" : "Tasky"}
			</MenuLink>
		}

		return <Grid>
			<Col fraction="1" class={css.header}>
				<Menu horizontal class={css.menu}>
					{model.props.disabled ? <MenuLink/> : menu()}
				</Menu>
			</Col>
			<Col fraction="1" class={css.content}>{children}</Col>
		</Grid>

		/*
		let menu = () => {
			let items = orgs.map((org) => {
				return <div onClick={() => setFocusedOrgById(model, org.id)} class={css.org}>
					{org.attributes.name || "Internal Error getting org name"}
				</div>
			}).concat([
				<div class={css.org}>
					<a>Logout</a>
				</div>
			]);

			return <div class={css.zeroheight}>
					<div class={css.right+" "+css.orgs} onClick={menuClick}>
						{items}
					</div>
				</div>
		}

		return <div>
			<div class={css.header}>
				<div class={css.left+" "+css.welcome}>
					{focused_org ? focused_org.attributes.name : "[No Org Selected]"}
				</div>
				<div class={css.right+" "+css.box} onClick={menuClick}>
					<div class={css.letter}>
						{user.attributes.email.slice(0,1).toUpperCase()}
					</div>
				</div>
			</div>
			{show_menu.value && menu() || <div/>}
			<div class={css.content}>
				{children}
			</div>
		</div>
		*/
	}
}
export default PageWrap;
