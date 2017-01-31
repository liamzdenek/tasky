export function mountSaga(func) {
    //console.log("MOUNTING: ", func);
    module.mounted = module.mounted || []
    module.mounted.push(func())
}

export default function* rootSaga() {
	//console.log("MOUNTING ROOT SAGAS: ", module.mounted);
    yield module.mounted;
}
