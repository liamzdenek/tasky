import {http_jsonapi} from 'sagas'
import {redirect, redirect_now} from 'components/RouterSingleton';
import {relatedQuery} from 'components/Resource'
import {BASE_URL} from 'util/config'
import {getSessionUserId} from 'components/Session'

export function logged_user(model) {
	return {
		type: "RESOURCE.REQUIRE",
		resource: "users",
		ids: [getSessionUserId(model)],
		get: () => {
			let cache = model.context.resource.cache;
			console.log("CACHE: ", cache);
			if(!cache || !cache.users) { return };
			return cache.users[getSessionUserId(model)];
		}
	}
}

export function logged_user_orgs(model) {
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
