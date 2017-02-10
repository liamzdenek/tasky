import { fork } from 'redux-saga/effects'

export function mountSaga(func) {
    console.log("ADDING SAGA: ", func);
    module.mounted = module.mounted || []
    module.mounted.push(func)
}

export default function* rootSaga() {
	console.log("MOUNTING ROOT SAGAS: ", module.mounted.length, module.mounted);
	yield module.mounted.map((f) => f());
}
