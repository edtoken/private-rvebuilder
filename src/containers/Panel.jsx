import React, { Component } from 'react'
import { connect } from 'react-redux'

import Lang from './Lang'

import { PanelTabsHeaderComponent } from '../components/PanelTabsHeader'
import { PanelTabElementComponent } from '../components/PanelTabElement'
import { PanelTabStructureComponent } from '../components/PanelTabStructure'
import { PanelTabBodyComponent } from '../components/PanelTabBody'

import { onChangeProperty, openPreview, resetTemplateChanges, setActivePanelTab } from '../actions'
import { getPanelProps } from '../selectors'

import * as modules from '../builder/modules'

const TABS_LIST = [
  {name: 'element', token: 'TAB_ELEMENT_TITLE'},
  {name: 'structure', token: 'TAB_STRUCTURE_TITLE'},
  {name: 'body', token: 'TAB_BODY_TITLE'}
]

const TAB_COMPONENTS = {
  'element': {
    component: PanelTabElementComponent,
    props: {
      modules: modules.element
    }
  },
  'structure': {
    component: PanelTabStructureComponent,
    props: {
      modules: [
        modules.structure.Row
      ]
    }
  },
  'body': {
    component: PanelTabBodyComponent,
    props: {
      elementId: 'body'
    }
  }
}

export class PanelComponent extends Component {
  static propTypes = {}

  render () {
    const {
      activeElementId,
      activePanelTab,
      setActivePanelTab,
      resetTemplate
    } = this.props

    let ActivePanelComponent = null

    let activePanelComponentProps = {
      activeElementId
    }

    if (TAB_COMPONENTS[activePanelTab]) {
      ActivePanelComponent = TAB_COMPONENTS[activePanelTab].component
      activePanelComponentProps = {...activePanelComponentProps, ...TAB_COMPONENTS[activePanelTab].props || {}}
    }

    return (<div className='RVEBuilder-Panel RVEBuilderPanel'>
      <div className='RVEBuilderPanelButtons'>
        <Lang
          onClick={() => (this.props.openPreview())}
          tagName='button'
          token='BUTTON_OPEN_PREVIEW'
          className='RVEBuilderPanelButtons-Button' />
      </div>
      <PanelTabsHeaderComponent
        tabsList={TABS_LIST}
        activePanelTab={activePanelTab}
        setActivePanelTab={setActivePanelTab} />

      <div className='RVEBuilderPanel-Content'>
        {ActivePanelComponent && <ActivePanelComponent {...activePanelComponentProps} />}
      </div>

      <div className='RVEBuilderPanelButtons'>
        <Lang tagName='button'
          onClick={() => (resetTemplate())}
          token='BUTTON_CLEAR_TEMPLATE'
          className='RVEBuilderPanelButtons-Button RVEBuilderPanelButtons-Button--clear' />
      </div>
    </div>)
  }
}

export default connect(
  (state, props) => (getPanelProps(state, props)),
  (dispatch) => ({
    openPreview: () => (dispatch(openPreview(dispatch))),
    resetTemplate: () => (dispatch(resetTemplateChanges())),
    onChangeProperty: (elementId, data) => (dispatch(onChangeProperty(elementId, data))),
    setActivePanelTab: (name) => (dispatch(setActivePanelTab(name)))
  })
)(PanelComponent)
