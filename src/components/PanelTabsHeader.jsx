import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Lang from '../containers/Lang'

export class PanelTabsHeaderComponent extends Component {
  static propTypes = {
    activePanelTab: PropTypes.string.isRequired,
    tabsList: PropTypes.array.isRequired,
    setActivePanelTab: PropTypes.func.isRequired
  }

  render () {
    const {activePanelTab, setActivePanelTab, tabsList} = this.props

    return (<div className='RVEBuilderTabs'>
      {tabsList.map((tab, i) => {
        let className = 'RVEBuilderTabs-Tab'

        if (activePanelTab === tab.name) {
          className += ' RVEBuilderTabs-Tab--active '
        }
        return (
          <Lang
            key={[tab.name, i].join('.')}
            token={tab.token}
            data-name={tab.name}
            className={className}
            onClick={(e) => {
              setActivePanelTab(e.target.dataset.name)
            }}
          />)
      })}
    </div>)
  }
}
