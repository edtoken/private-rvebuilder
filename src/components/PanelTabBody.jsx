import React, { Component } from 'react'

import PanelPropertiesList from '../containers/PanelPropertiesList'

export class PanelTabBodyComponent extends Component {
  render () {
    return (<div>
      <PanelPropertiesList elementId='body' activeElementId='body' />
    </div>)
  }
}
