export function mountSaga(func) {
    console.log("ADDING SAGA: ", func);
    module.mounted = module.mounted || []
    module.mounted.push(func())
}

export default function* rootSaga() {
	console.log("MOUNTING ROOT SAGAS: ", module.mounted);
    yield module.mounted;
}
