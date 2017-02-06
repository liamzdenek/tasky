const {element} = require('deku')
import pure from 'purecss/build/pure-min.css'
import Wrap from 'pure/util'

const Grid = {
	render: (model) => {
		return <Wrap real="div" origin={model.props} class={pure["pure-g"]} children={model.children}/>
	}
}
export default Grid;

const Col = {
	render: (model) => {
		if(!model.props.fraction) {
			throw new Error("Col MUST have a fraction provided");
		}
		let css = pure["pure-u-"+model.props.fraction];
		delete model.props.fraction;
		return <Wrap real="div" origin={model.props} class={css} children={model.children}/>
	}
}
export {Col};
