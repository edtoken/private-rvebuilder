import React, { Component } from 'react'
import _ from 'lodash'

import PanelPropertiesList from '../containers/PanelPropertiesList'

const ROW_SCHEMES = [
  {title: 'Full row (100%)', scheme: [12]},
  {title: 'Two cols [ 50% | 50% ]', scheme: [6, 6]},
  {title: 'Two cols [ 33% | 67% ]', scheme: [4, 8]},
  {title: 'Two cols [ 67% | 33% ]', scheme: [8, 4]},
  {title: 'Two cols [ 16.6% | 83.4% ]', scheme: [2, 10]},
  {title: 'Two cols [ 83.4% | 16.6% ]', scheme: [10, 2]},
  {title: 'Two cols [ 25% | 75% ]', scheme: [3, 9]},
  {title: 'Two cols [ 75% | 25% ]', scheme: [9, 3]},
  {title: 'Three cols [ 33.3% | 33.3% | 33.3% ]', scheme: [4, 4, 4]},
  {title: 'Four cols [ 25% | 25% | 25% | 25% ]', scheme: [3, 3, 3, 3]}
]

export class PanelTabStructureComponent extends Component {
  render () {
    const {modules, activeElementId} = this.props

    let indx = 0
    let mods = _.reduce(modules, (memo, mod, modName) => {
      indx += 1

      return [...memo].concat(_.map(ROW_SCHEMES, (customProps, schemeIndx) => {
        return (<mod.PanelElement
          key={['tab.structure', modName, indx, schemeIndx].join('.')}
          scheme={customProps.scheme} />)
      }))
    }, [])

    return (<div>
      {!activeElementId && mods}
      {activeElementId && <PanelPropertiesList activeElementId={activeElementId} />}
    </div>)
  }
}
