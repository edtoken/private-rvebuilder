import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Main from './Main'
import Panel from './Panel'
import Loader from '../components/Loader'

import { init, initUpdate } from '../actions'
import { getLayoutProps } from '../selectors'

console.log('PropTypes', PropTypes)

export class RVEBuilder extends Component {
  static propTypes = {
    template: PropTypes.object,
    tokens: PropTypes.array,
    wysiwyg: PropTypes.instanceOf(Component),
    onChangeImage: PropTypes.func,
    onSaveTemplate: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.init(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps
    this.props.initUpdate(this.props)
  }

  render () {
    const {
      isFetching,
      templateIsPreview
    } = this.props

    let className = 'RVEBuilder'

    if (!templateIsPreview) {
      className += ' RVEBuilder--editable '
    }

    return (<div className={className}>
      {isFetching && <Loader />}
      <Main />
      <Panel />
    </div>)
  }
}

export default connect(
  (state, props) => (getLayoutProps(state, props)),
  (dispatch) => ({
    init: (props) => (dispatch(init(props))),
    initUpdate: (props) => (dispatch(initUpdate(props)))
  })
)(RVEBuilder)
