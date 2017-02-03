import {http_jsonapi} from 'sagas'
import {redirect, redirect_now} from 'components/RouterSingleton';
import {relatedQuery} from 'components/Resource'
import {BASE_URL} from 'util/config'

export function logged_user(model) {
	const {getSessionUserId} = require('components/Session')
	return {
		type: "RESOURCE.REQUIRE",
		resource: "users",
		ids: [getSessionUserId(model)],
		get: () => {
			let cache = model.context.resource.cache;
			if(!cache || !cache.users) { return };
			return cache.users[getSessionUserId(model)];
		}
	}
}

export function logged_user_orgs(model) {
	const {getSessionUserId} = require('components/Session')
	return {
		type: "RESOURCE.REQUIRE",
		resource: "users",
		ids: [getSessionUserId(model)],
		include: ["org_join", "org_join.org"],
		get: () => {
			return relatedQuery({
				model,
				resource: "users",
				id: getSessionUserId(model),
				path: "org_join.org",
			})
		}
	}
}

export function focused_org(model) {
	const {getFocusedOrg, getFocusedOrgId} = require('controllers/FocusedOrg');
	if(getFocusedOrgId(model) == null) {
		return;
	}
	return {
		type: "RESOURCE.REQUIRE",
		resource: "orgs",
		ids: [getFocusedOrgId(model)],
		get: () => {
			return getFocusedOrg(model);
		}
	}
}

