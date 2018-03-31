import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BroadcastHOC from 'react-entangle';
import Card from 'material-ui/Card';
import Typo from 'material-ui/Typography';

import './style.css';
import ChipInput from "../ChipInput/index";
import MessageList from "../MessageList";
import SendInput from "../SendInput";

class Client extends Component {
	static propTypes = {
		client: PropTypes.string,
		defaultChannel: PropTypes.arrayOf(PropTypes.string)
	};

	constructor(props) {
		super(props);
		this.state = {
			channels: props.defaultChannel || []
		};
	}

	componentWillReceiveProps(props) {
		if (props.event !== this.props.event)
			console.log(props.event);
	}

	render() {
		return (
			<Card className="section">
				<Typo variant='headline'>{this.props.client}</Typo>
				<ChipInput
					defaultValue={this.state.channels}
					placeholder='Add Channels' max={4}
					onChange={channels => this.setState({channels})}/>
				<BroadcastHOC channels={this.state.channels}>
					{({data}) => <MessageList key={0} message={data}/>}
					{({emitter}) => <SendInput key={1} emitter={emitter} channels={this.state.channels}/>}
				</BroadcastHOC>
			</Card>
		);
	}
}

export default Client;