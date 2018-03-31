import React, {Component, Fragment} from 'react';


import Client from "./components/Client";


export default class App extends Component {
	render() {
		return (
			<Fragment>
				<Client client={'Alice'} defaultChannel={['hello', 'world']}/>
				<Client client={'Bob'} defaultChannel={['hello', 'channel1']}/>
				<Client client={'Charlie'} defaultChannel={['world']}/>
				<Client client={'Eve'} defaultChannel={['channel1', 'world']}/>
			</Fragment>
		);
	}
}