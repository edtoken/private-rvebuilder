import React, { Component } from 'react'

import Lang from './../containers/Lang'

export default class Loader extends Component {
  render () {
    return (<div className='RVEBuilder-Loader'>
      <Lang token='LOADING' />
    </div>)
  }
}
