/**
 * Example basic demo
 */

/**
 *
 * Step 1 of 2
 * The store should know how to handle actions coming from the form components.
 * To enable this, we need to pass the builderReducer to your store.
 * It serves for all of your form components, so you only have to pass it once.
 *
 */

import { combineReducers, createStore } from 'redux'
import { Builder as RVEBuilder, reducer as builderReducer } from 'rvebuilder'
import React, { Component } from 'react'

import '../src/theme/default.scss'
import { DevTools } from './util/DevTools'
import { init } from './util/render'

const rootReducer = combineReducers({
  _rveBuilder: builderReducer
})

/**
 *
 * Step 2 of 2
 * ...
 * ...
 * ...
 *
 */

class YourWrapperComponent extends Component {

  constructor (props) {
    super(props)
    this.state = {lang: 'en'}

    this.onSaveTemplate = this.onSaveTemplate.bind(this)

    this.handleChangeLang = this.handleChangeLang.bind(this)
  }

  onSaveTemplate (template) {
    // ...
  }

  handleChangeLang (e) {
    this.setState({lang: e.target.dataset.lang})
  }

  render () {

    let builderProps = {
      onSaveTemplate: this.onSaveTemplate,
      lang: this.state.lang
    }

    return (<div>
      <div className="text-center">
        <br/>
        <button
          onClick={this.handleChangeLang}
          data-lang="ru"
          className="btn btn-primary btn-xs">
          RU
        </button>
        <button
          onClick={this.handleChangeLang}
          data-lang="en"
          className="btn btn-primary btn-xs">
          EN
        </button>
      </div>
      <hr/>
      <RVEBuilder {...builderProps}/>
    </div>)
  }
}

/******** Next code is only for the demo to work ********/
const store = createStore(rootReducer, DevTools.instrument())

init(store, YourWrapperComponent)

