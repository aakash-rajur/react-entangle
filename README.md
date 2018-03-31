# react-entangle

> HOC allowing components to communicate without any shared contexts using native BroadcastChannel API

[![NPM](https://img.shields.io/npm/v/react-entangle.svg)](https://www.npmjs.com/package/react-entangle) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


I found the native API amusing and wondered why has not anyone implemented an HOC in react for this.  
Here is a draft implementation in react. I am not sure where or how this API should be used in the react ecosystem,  
please enlighten me if you find any meaning ful implementation.

[BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)


## Demo
https://aakashrajur.github.io/react-entangle/


## Install

```bash
npm install --save react-entangle
```

## Usage

> App.js
```jsx harmony
import React, { Component, Fragment } from 'react';
import BroadcastHOC from 'react-entangle';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import ComponentC from './ComponentC';
import OtherComponent './OtherComponent';

class App extends Component {
  render () {
    return (
      <BroadcastHOC>
        {({data, emitter}) => 
          <Fragment>
            <ComponentA message={data}/>
            <ComponentB emitter={emitter}/>
            <ComponentC emitter={emitter} data={data}/>
            <OtherComponent/>
          </Fragment>}
      </BroadcastHOC>
    );
  }
}
```



> ComponentC.js
```jsx harmony
import React, { Component } from 'react';

class ComponentC extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  
  render() {
    let {data} = this.props;
    return(
	  <div className='wrapper'>
		<div>{data ? JSON.stringify(data): 'No data'}</div>
		<div><button onClick={this.onClick}>Send Message</button></div>
	  </div>
	);
  }
  
  onClick() {
    this.props.emitter('channel_name', {hello: 'world', any:'complex data'});
  }
}
```


## API
# channels (prop)  
provide channels on which the HOC will listen and emit data to  
type: string or array of strings

# children
you need to provide a function as a child which will receive data and emitter as arguments
```jsx harmony
({emitter, data}) => <YourComponent emitter={emitter} data={data}/>
```

## Note
Objects emitted are clones and not references.  
Functions and errors cannot be sent over  
[Further Reading](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)

## [Licence (MIT)](https://github.com/aakashRajur/react-entangle/blob/master/LICENCE)
Feel free to use the source anyhow you want.
