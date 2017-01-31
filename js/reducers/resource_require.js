export default function reducer(state, action) {
	state = state || {}

	if(action.type == "RESOURCE_REQUIRE") {
		if(action.kind == "ids") {
			state = reducer_ids(state, action)
		} else {
			throw Exception("RESOURCE_REQUIRE of kind "+action.kind+" is not supported");
		}
	
	}
}
