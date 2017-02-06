const {element} = require('deku')
import pure from 'purecss/build/pure-min.css'
import Wrap from 'pure/util'

const Menu = {
	render: (model) => {
		return <Wrap real="div" origin={model.props} class={pure["pure-menu"]} children={model.children}/>
	}
}
export default Menu;

export const MenuList = {
	render: (model) => {
		return <Wrap real="ul" origin={model.props} class={pure["pure-menu-list"]} children={model.children}/>
	}
}

export const MenuItem = {
	render: (model) => {
		return <Wrap real="li" origin={model.props} class={pure["pure-menu-item"]} children={model.children}/>
	}
}

export const MenuLink = {
	render: (model) => {
		return <Wrap real="a" origin={model.props} children={model.children}
			class={[
				pure["pure-menu-link"],
				model.props.heading && pure["pure-menu-heading"],
			]}
		/>
	}
}
