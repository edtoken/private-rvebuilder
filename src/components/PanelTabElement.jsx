import React, { Component } from 'react'
import _ from 'lodash'

export class PanelTabElementComponent extends Component {
  render () {
    const {modules} = this.props

    let indx = 0
    let mods = _.map(modules, (mod, modName) => {
      indx += 1
      return (<mod.PanelElement key={['tab.element', modName, indx].join('.')} />)
    })

    return (<div>
      {mods}
    </div>)
  }
}
