import React, { Component } from 'react'
import { MainElement as BodyMainElement } from '../builder/modules/Body'

import { getLibState, getMainProps } from '../selectors'
import { connect } from 'react-redux'

class TemplateJSONPreviewComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.state.template = props.template

    this.timers = {}
    this.timers.update = false
  }

  componentDidMount () {
    this._update()
  }

  componentWillUnmount () {
    clearTimeout(this.timers.update)
  }

  _update () {
    if (this.timers.update) {
      clearTimeout(this.timers.update)
    }

    this.timers.update = setTimeout(() => {
      this.setState({template: this.props.template})
      this._update()
    }, 500)
  }

  render () {
    const {template} = this.props

    let styles = {
      backgroundColor: '#f9f9f9',
      border: '1px dashed #2f6fab',
      maxHeight: '300px',
      overflow: 'auto'
    }

    const code = JSON.stringify(template, null, 2)

    return (<div>
      <div className='container-fluid' style={{overflow: 'hidden', maxWidth: '600px'}}>
        <hr />
        <h4>Template structure preview</h4>
        <pre style={styles}><code>{code}</code></pre>
        <hr />
        <textarea className='form-control' style={{minHeight: '150px'}} value={code} onChange={() => {
        }} />
      </div>
    </div>)
  }
}

export const TemplateJSONPreview = connect(
  (state) => ({
    template: getLibState(state).template
  }),
  (dispatch) => ({})
)(TemplateJSONPreviewComponent)

export class MainComponent extends Component {
  static propTypes = {}

  render () {
    // todo: yui3-cssreset
    return (<div className='RVEBuilder-Main'>
      <div>
        <BodyMainElement />
        <TemplateJSONPreview />
      </div>
    </div>)
  }
}

export default connect(
  (state) => (getMainProps(state)),
  (dispatch) => ({})
)(MainComponent)
