import _ from 'lodash'

const propNames = [
  'id',
  'className',
  'onClick',
  'onMouseDown',
  'onMouseUp',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onDragStart',
  'onDragEnd',
  'onDrop',
  'onDragEnter',
  'onDragOver',
  'onDragLeave'
]

const propNameRegexp = [
  /(data-)/
]

const isValidDOMProperty = (name) => {
  return Boolean(propNames.indexOf(name) > -1 || propNameRegexp.find(r => r.test(name)))
}

export const pickValidDOMProps = (props) => {
  return _.pickBy(props, (value, key) => isValidDOMProperty(key))
}
