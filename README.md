# react-entangle

> HOC allowing components to communicate without any shared contexts using native BroadcastChannel API

[![NPM](https://img.shields.io/npm/v/react-entangle.svg)](https://www.npmjs.com/package/react-entangle) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-entangle
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-entangle'

class Example extends Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## License

MIT © [aakashRajur](https://github.com/aakashRajur)
