import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BroadcastHOC extends Component {
	static propTypes = {
		channels: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string)
		])
	};

	constructor(props) {
		super(props);
		this.onMessage = this.onMessage.bind(this);
		this.broadcastMessage = this.broadcastMessage.bind(this);
		this.channels = [];
		this.state = {message: null};
	}

	componentWillMount() {
		let {channels: _channels} = this.props;
		if (!_channels) return;
		let {BroadcastChannel} = window;
		this.channels = this.channels.concat([].concat(_channels)
			.map(name => {
				let channel = new BroadcastChannel(name);
				channel.onmessage = this.onMessage;
				return channel;
			}));
	}

	componentWillReceiveProps(props) {
		let {BroadcastChannel} = window;
		this.channels.forEach(channel => channel.close());
		if (props.channels) {
			this.channels = [].concat(props.channels)
				.map(name => {
					let channel = new BroadcastChannel(name);
					channel.onmessage = this.onMessage;
					return channel;
				});
		}
	}

	componentWillUnmount() {
		this.channels.forEach(channel => channel.close());
	}

	render() {
		let {children} = this.props;
		if (Array.isArray(children))
			return children.map(child => child instanceof Function ? child({
				emitter: this.broadcastMessage,
				data: this.state.message
			}) : child);
		if (children instanceof Function)
			return children({
				emitter: this.broadcastMessage,
				data: this.state.message
			});
		return children;
	}

	onMessage(e) {
		let {currentTarget: {name: channel}, data} = e;
		this.setState({message: {channel, data, timestamp: new Date()}});
	}

	broadcastMessage(name, data) {
		let channel = this.channels.find(({name: _name}) => _name === name);
		if (!channel) return;
		channel.postMessage(data);
	}
}

export default BroadcastHOC;