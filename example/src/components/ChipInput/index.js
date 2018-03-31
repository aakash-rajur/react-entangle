import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Input from 'material-ui/Input';
import Chip from 'material-ui/Chip';

import './style.css';

class ChipInput extends Component {
	static propTypes = {
		defaultValue: PropTypes.arrayOf(PropTypes.string),
		onChange: PropTypes.func,
		placeholder: PropTypes.string,
		id: PropTypes.string,
		max: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.onAction = this.onAction.bind(this);
		this.onChipDelete = this.onChipDelete.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			chips: props.defaultValue || []
		};
	}

	render() {
		return (
			<Input
				className='chip-input'
				fullWidth={true}
				id={this.props.id}
				inputComponent={() =>
					<Fragment>
						{
							this.state.chips.map((chip, key) =>
								<Chip key={key} label={chip} className='chip'
								      onDelete={this.onChipDelete(key)}/>)
						}
						{this.state.chips.length < (this.props.max || 5) &&
						<input type="text" placeholder={this.props.placeholder}
						       onKeyPress={this.onAction} onKeyUp={this.onAction}/>}
					</Fragment>
				}
			/>
		);
	}

	onChipDelete(index) {
		return () => {
			let {chips} = this.state;
			chips.splice(index, 1);
			this.setState({chips}, this.onChange);
		};
	}

	onChange() {
		let {onChange} = this.props,
			{chips} = this.state;
		onChange && onChange(chips);
	}

	onAction({which, target: {value}}) {
		switch (which) {
			case 13: {
				let {chips} = this.state,
					_value = (value || '').trim();
				if (!_value || chips.includes(_value)) return;
				chips.push(_value);
				this.setState({chips}, this.onChange);
				this.previous = value;
				break;
			}
			case 8: {
				let _value = (value || '');
				if (!this.previous) {
					let {chips} = this.state;
					chips.splice(chips.length - 1, 1);
					this.setState({chips}, this.onChange);
				}
				this.previous = _value;
				break;
			}
			default:
				this.previous = value;
		}
	}
}

export default ChipInput;