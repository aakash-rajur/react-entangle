import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';

class SendInput extends Component {
	static propTypes = {
		emitter: PropTypes.func,
		channels: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string)
		])
	};

	constructor(props) {
		super(props);
		this.onEnter = this.onEnter.bind(this);
		this.state = {
			text: '',
			channel: props.channels && props.channels.length ? props.channels[0] : ''
		};
	}

	render() {
		return (
			<div className='message-wrapper'>
				<Input
					value={this.state.text}
					placeholder='Enter new message'
					className='message-input'
					onChange={({target: {value: text}}) => this.setState({text})}
					onKeyPress={this.onEnter}/>
				<Select className='select-channel'
				        value={this.state.channel}
				        onChange={({target: {value}}) => this.setState({channel: value})}>
					{this.props.channels && this.props.channels
						.map((channel, key) => <MenuItem key={key} value={channel}>{channel}</MenuItem>)}
				</Select>
				<Button variant="fab" mini color='primary' disabled={!this.state.text}
				        className='send' onClick={this.onEnter}>
					<span className="material-icons">send</span>
				</Button>
			</div>
		);
	}

	onEnter({which, target: {tagName}}) {
		switch (tagName) {
			case 'INPUT': {
				if (which !== 13) return;
				let {text} = this.state;
				this.sendMessage((text || '').trim());
				break;
			}
			case 'SPAN': {
				let {text} = this.state;
				this.sendMessage((text || '').trim());
				break;
			}
			default:
				return;
		}
		this.setState({text: ''});
	}

	sendMessage(value) {
		if (!value) return;
		let {text, channel} = this.state, {emitter} = this.props;
		emitter && emitter(channel, text);
	}
}

export default SendInput;