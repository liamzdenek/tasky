const {element} = require('deku')

const Wrap = {
	render: (model) => {
		let origin = model.props.origin;

		let classes = [];
		if(Array.isArray(model.props.class)) {
			classes = classes.concat(model.props.class);
		} else {
			classes.push(model.props.class);
		}
		if(Array.isArray(model.props.origin.class)) {
			classes = classes.concat(model.props.origin.class)
		} else {
			classes.push(model.props.origin.class);
		}

		let css = "";
		for(let i in classes) {
			let tclass = classes[i];
			if(tclass == null || tclass == undefined || tclass == false) {
				continue;
			}
			
			if(css.length != 0) {
				css += " ";
			} 
			css += tclass;
		}

		let real = model.props.real;

		let children = model.children;
		if(model.props.children) {
			children = children.concat(model.props.children);
			delete model.props.children;
		}

		delete model.props.class;
		delete model.props.origin;
		delete model.props.real;

		return element.apply(null, [
			real,
			Object.assign({}, origin, model.props, {class:css}),
			...children,
		]);
	}
}
export default Wrap;
