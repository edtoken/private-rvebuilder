const TEMPLATE_STRUCTURE_TYPE_LEVELS = ['rows', 'cols', 'elements']

const mergeModuleStyles = (module, mainStyles) => {
  let wrapper = {}
  let container = {}
  let selector = {}

  if (!module) {
    return {
      wrapper,
      container,
      selector
    }
  }

  let moduleStyles = module.styles || undefined

  if (moduleStyles) {
    wrapper = moduleStyles.wrapper || {}
    container = moduleStyles.container || {}
    selector = moduleStyles.selector || {}
  }

  if (mainStyles && mainStyles.selector) {
    wrapper = Object.assign({}, mainStyles.selector, wrapper)
    container = Object.assign({}, mainStyles.selector, container)
    selector = Object.assign({}, mainStyles.selector, selector)
  }

  return {
    wrapper,
    container,
    selector
  }
}

export const getLibState = (state) => {
  return state._rveBuilder
}

export const getTemplateStructure = (state, isPluginState) => {
  let libState = !isPluginState ? getLibState(state) : state
  let template = libState ? libState.template : undefined
  return template && template.structure ? template.structure : undefined
}

export const getElementInfoById = (elementId) => {
  if (!elementId) {
    return undefined
  }

  let elementIdData = elementId.split('-')
  let isNew = elementId.indexOf('New') > -1
  let elementPosition = elementIdData.slice(1)
  let elementType = (isNew) ? elementId.split('New').shift() : elementIdData.shift()
  elementType = elementType.charAt(0).toUpperCase() + elementType.slice(1)

  elementPosition = elementPosition.map(p => parseInt(p))

  return {
    isNew,
    position: elementPosition,
    elementType,
    elementId
  }
}

export const getElementById = (state, elementId, isPluginState) => {
  // todo performance
  let structure = getTemplateStructure(state, isPluginState)

  if (!structure || !elementId) {
    return undefined
  }

  switch (elementId) {
    case 'body':
      return structure.body

    case 'rows':
      return structure.rows
  }

  let elementPositionCoord = elementId.split('-').slice(1)
  let element = structure

  try {
    for (let i = 0; i < elementPositionCoord.length; i++) {
      let levelStructureKey = TEMPLATE_STRUCTURE_TYPE_LEVELS[i]
      let elementPositionIndex = parseInt(elementPositionCoord[i])

      element = element[levelStructureKey]
      element = element[elementPositionIndex]
    }

    return element || undefined
  } catch (e) {
    console.error(e)
  }
}

export const getLangProps = (state, props) => {
  let libState = getLibState(state)
  let lang = libState.lang
  let tokens = libState.tokens
  let token = props.token
  let tokenValue = tokens[token] && tokens[token][lang] ? tokens[token][lang] : '{' + token + '}'

  return {
    tokenValue
  }
}

export const getLayoutProps = (state, props) => {
  let libState = getLibState(state)

  return {
    isFetching: libState.isFetching,
    templateIsPreview: libState.templateIsPreview
  }
}

export const getPanelProps = (state) => {
  let output = {}

  let libState = getLibState(state)

  output.tokens = libState.tokens
  output.activeElementId = libState.activeElementId || ''
  output.activePanelTab = libState.activePanelTab

  return output
}

export const getMainProps = (state) => {
  let output = {}

  return output
}

export const getBodyModuleProps = (state, props) => {
  let output = {}
  output.elementId = 'body'

  let libState = getLibState(state)
  output.rows = getElementById(libState, 'rows', true)
  output.hasRows = Boolean(output.rows && output.rows.length)

  output.activeElementId = libState.activeElementId || ''
  output.overElementId = libState.overElementId || ''
  output.templateIsPreview = libState.templateIsPreview

  output.styles = mergeModuleStyles(getElementById(libState, 'body', true))

  return output
}

export const getRowModuleProps = (state, props) => {
  let output = {}
  output.elementId = `row-${props.rowIndx}`

  let libState = getLibState(state)

  output.row = getElementById(libState, output.elementId, true)
  output.hasCols = Boolean(output.row && output.row.cols && output.row.cols.length)
  output.cols = output.hasCols ? output.row.cols : []

  output.activeElementId = libState.activeElementId || ''
  output.overElementId = libState.overElementId || ''
  output.templateIsPreview = libState.templateIsPreview

  output.styles = mergeModuleStyles(output.row, props.mainStyles)

  // set body container background to row wrapper
  if (output.styles.wrapper.backgroundColor === 'transparent' && props.mainStyles.container.backgroundColor) {
    output.styles.wrapper.backgroundColor = props.mainStyles.container.backgroundColor
  }

  return output
}

export const getColumnModuleProps = (state, props) => {
  let output = {}
  output.elementId = `column-${props.rowIndx}-${props.colIndx}`

  let libState = getLibState(state)

  output.column = getElementById(libState, output.elementId, true)
  output.hasElements = Boolean(output.column && output.column.elements && output.column.elements.length)
  output.elements = output.hasElements ? output.column.elements : []

  output.activeElementId = libState.activeElementId || ''
  output.overElementId = libState.overElementId || ''
  output.templateIsPreview = libState.templateIsPreview

  output.styles = mergeModuleStyles(output.column, props.mainStyles)

  return output
}

export const getElementModuleProps = (state, props) => {
  let output = {}
  output.elementId = `element-${props.rowIndx}-${props.colIndx}-${props.elIndx}`

  let libState = getLibState(state)

  output.element = getElementById(libState, output.elementId, true)
  output.elementId = output.elementId.replace('element', output.element.type)

  output.activeElementId = libState.activeElementId || ''
  output.isActive = (output.activeElementId === output.elementId)
  output.overElementId = libState.overElementId || ''
  output.templateIsPreview = libState.templateIsPreview

  output.styles = mergeModuleStyles(output.element, props.mainStyles)

  return output
}

export const getPanelPropertiesListProps = (state, props) => {
  let output = {}

  let libState = getLibState(state)

  output.elementInfo = getElementInfoById(props.activeElementId)
  output.element = getElementById(libState, props.activeElementId, true)
  output.colorPalette = libState.colorPalette

  return output
}
