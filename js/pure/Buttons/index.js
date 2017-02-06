const {element} = require('deku')
import pure from 'purecss/build/pure-min.css'
import Wrap from 'pure/util'

const button = (real) => model => {
	let css = [
		pure["pure-button"],
		model.props.primary && pure["pure-button-primary"],
		model.props.active && pure["pure-button-active"],
	];
	delete model.props.primary;
	delete model.props.active;
	return <Wrap real={real} origin={model.props} class={css} children={model.children}/>
}

const A = {
	render: button("a"),
}
export default A;

export const Submit = {
	render: (model) => {
		model.props.type = "submit";
		return button("input")(model);
	}
}
