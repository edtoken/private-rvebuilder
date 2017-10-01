import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { DevTools } from './DevTools'

const CSS_CDN = ['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css']

export const init = (store, ExampleComponent) => {

  CSS_CDN.forEach((cssLink) => {
    let node = document.createElement('link')
    node.rel = 'stylesheet'
    node.href = cssLink
    document.head.appendChild(node)
  })

  render(<Provider store={store}>
    <div>
      <DevTools />
      <ExampleComponent />
    </div>
  </Provider>, document.getElementById('app-wrapper'))
}
