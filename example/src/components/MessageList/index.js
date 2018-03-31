import React, {Component} from 'react';
import PropTypes from 'prop-types';

import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import IconButton from 'material-ui/IconButton';

class MessageList extends Component {
	static propTypes = {
		message: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		])
	};

	constructor(props) {
		super(props);
		this.state = {
			messages: []
		};
		this.last = null;
		this.scrollToBottom = this.scrollToBottom.bind(this);
		this.onMessageDelete = this.onMessageDelete.bind(this);
	}

	componentWillReceiveProps(props) {
		if (props.message && props.message !== this.props.message) {
			let {messages} = this.state;
			messages.push(props.message);
			this.setState({messages}, this.scrollToBottom);
		}
	}

	render() {
		let {messages} = this.state;
		return (
			messages.length ?
				<List className='messages' dense={true}>
					{messages.map(({channel, data, timestamp}, index) =>
						<ListItem key={index} button
						          ContainerProps={index + 1 === messages.length ? {ref: node => this.last = node} : {}}>
							<ListItemText
								primary={data}
								secondary={`#${channel} (${timestamp.toLocaleTimeString()})`}/>
							<ListItemSecondaryAction>
								<IconButton onClick={this.onMessageDelete(index)}>
									<span className="material-icons">clear</span>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>)}
				</List> :
				<div className="no-messages">
					No Messages
				</div>
		);
	}

	onMessageDelete(index) {
		return () => {
			let {messages} = this.state;
			messages.splice(index, 1);
			this.setState({messages}, this.scrollToBottom);
		};
	}

	scrollToBottom() {
		if (!this.state.messages.length)
			return this.last = null;
		this.last.scrollIntoView({behavior: 'smooth'});
	}
}

export default MessageList;