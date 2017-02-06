const {element} = require('deku')
import pure from 'purecss/build/pure-min.css'
import Wrap from 'pure/util'

const Form = {
	render: (model) => {
		let css = [
			pure["pure-form"],
			model.props.stacked && pure["pure-form-stacked"],
			model.props.aligned && pure["pure-form-aligned"],
		];
		delete model.props.stacked;
		delete model.props.aligned;
		return <Wrap real="form" origin={model.props} class={css} children={model.children}/>
	}
}
export default Form;

export const Group = {
	render: (model) => {
		return <Wrap real="fieldset" origin={model.props} class={pure["pure-group"]} children={model.children}/>
	}
}

export const ControlGroup = {
	render: (model) => {
		return <Wrap real="div" origin={model.props} class={pure["pure-control-group"]} children={model.children}/>
	}
}

export const Controls = {
	render: (model) => {
		return <Wrap real="div" origin={model.props} class={pure["pure-controls"]} children={model.children}/>
	}
}

export const Input = {
	render: (model) => {
		let props = model.props;
		if(props.fraction) {
			props.fraction = "-"+props.fraction;
		}
		props.class = pure["pure-input"+props.fraction]+(props.class ? " "+props.class : "");
	}
}

export const Message = {
	render: (model) => {
		return <span class={pure["pure-form-message"]}>{model.children}</span>
	}
}

export const Checkbox = {
	render: (model) => {
		return <label for={model.path} class={pure["pure-checkbox"]}>
			<input id={model.path} type="checkbox" name={model.props.name} checked={model.props.checked}/> {model.children}
		</label>
	}
}

export const AlignedInput = {
	render: (model) => {
		let {path, props, children} = model;
		return <ControlGroup>
			<label for={path}>{props.label}</label>
			<Wrap real="input" origin={props} id={path} placeholder={props.label}/>
			{children}
		</ControlGroup>
	}
}
