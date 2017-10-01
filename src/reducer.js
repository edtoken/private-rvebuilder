import {
  CHANGE_ELEMENT_PROPERTY,
  CLONE_ELEMENT,
  CLOSE_PREVIEW,
  DELETE_ELEMENT,
  INIT,
  INIT_UPDATE,
  MOVE_ELEMENT,
  OPEN_PREVIEW,
  RESET_TEMPLATE_CHANGES,
  SET_ACTIVE_ELEMENT_ID,
  SET_ACTIVE_PANEL_TAB,
  SET_OVER_ELEMENT_ID
} from './actionTypes'

import * as modules from './builder/modules'
import { closePreview } from './actions'

import { createReducer } from './util/createReducer'
import { getElementById, getElementInfoById, getTemplateStructure } from './selectors'

import { getScheme as getRowScheme } from './builder/modules/Row'

const tokens = require('./tokens.json')
const template = require('./../examples/template-1.json')

export const initialState = {
  initTemplate: JSON.parse(JSON.stringify(template)),
  template: template,
  tokens: tokens,

  lang: 'en',

  isFetching: true,
  templateIsPreview: false,
  colorPalette: [], // template color palette

  activeElementId: undefined,
  overElementId: undefined,
  activePanelTab: 'element' // one of ['element', 'structure', 'body']

}

const updateInitDiffInitState = (keys) => {
  return (state, action) => {
    let copy = {
      ...state
    }
    keys.reduce((memo, key) => {
      if (action.props[key] !== undefined) {
        memo[key] = action.props[key]

        if (key === 'template') {
          memo['initTemplate'] = JSON.parse(JSON.stringify(memo[key]))
        }
      }
      return memo
    }, copy)

    return copy
  }
}

const _getObjPalette = (obj) => {
  let output = []

  if (!obj || !obj.styles) {
    return output
  }

  if (obj.styles.wrapper) {
    output.push(obj.styles.wrapper['color'], obj.styles.wrapper['backgroundColor'])
  }
  if (obj.styles.container) {
    output.push(obj.styles.container['color'], obj.styles.container['backgroundColor'])
  }

  return output.filter(color => color)
}

const getPalette = (structure) => {
  let ignoreColors = ['transparent']

  let palette = [].concat(_getObjPalette(structure.body))

  // todo each all elements
  for (let r = structure.rows.length; r--;) {
    palette = palette.concat(_getObjPalette(structure.rows[r]))

    for (let c = structure.rows[r].cols.length; c--;) {
      palette = palette.concat(_getObjPalette(structure.rows[r].cols[c]))

      for (let e = structure.rows[r].cols[c].length; e--;) {
        palette = palette.concat(_getObjPalette(structure.rows[r].cols[c].elements[e]))
      }
    }
  }

  return [...new Set(palette)].filter(c => ignoreColors.indexOf(c) < 0).sort()
}

const actionHandlers = {
  [INIT]: updateInitDiffInitState(['template', 'tokens', 'lang', 'isFetching']),
  [INIT_UPDATE]: updateInitDiffInitState(['tokens', 'lang']),
  [OPEN_PREVIEW]: (state, action) => {
    let copy = {...state}
    copy.isFetching = true
    copy.activeElementId = ''
    copy.activePanelTab = 'element'
    copy.overElementId = ''
    copy.templateIsPreview = true

    // todo fix it
    setTimeout(() => {
      let node = document.getElementById('RVEBuilder-MainWrapper')
      let templateHTML = node.innerHTML

      let width = copy.template.structure.body.styles.container.maxWidth || '500px'
      width = parseInt(width.match(/[0-9]*/)[0])

      let left = (screen.width - width) / 2
      let top = (screen.height - 500) / 2
      let height = 500
      let win = window.open('', 'TEMPLATE PREVIEW', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left)
      win.document.body.style.padding = 0
      win.document.body.style.margin = 0
      win.document.body.innerHTML = templateHTML

      // todo
      action.dispatch(closePreview())
    }, 1)

    return copy
  },
  [CLOSE_PREVIEW]: (state, action) => ({
    isFetching: false,
    templateIsPreview: false
  }),
  [RESET_TEMPLATE_CHANGES]: (state, action) => ({
    ...initialState,
    lang: state.lang,
    activePanelTab: 'element',
    isFetching: false,
    template: JSON.parse(JSON.stringify(state.initTemplate))
  }),
  [SET_ACTIVE_PANEL_TAB]: (state, action) => ({
    ...state,
    activePanelTab: action.panelTabName,
    activeElementId: ''
  }),
  [SET_ACTIVE_ELEMENT_ID]: (state, action) => ({
    ...state,
    activePanelTab: action.elementId ? 'structure' : state.activePanelTab,
    activeElementId: action.elementId
  }),
  [SET_OVER_ELEMENT_ID]: (state, action) => ({
    ...state,
    overElementId: action.elementId
  }),
  [MOVE_ELEMENT]: (state, action) => {
    let copy = {...state}

    let elementsData = [action.fromId, action.toId]
    let dragParams = action.params

    elementsData = elementsData.map((elementId, i) => (getElementInfoById(elementId)))

    // todo
    let originInfo = elementsData[0]
    let distanceInfo = elementsData[1]

    let structure = getTemplateStructure(copy, true)

    // mega todo
    let scheme

    if (originInfo.isNew === true) {
      switch (originInfo.elementType) {
        case 'Row':
          scheme = dragParams.scheme
          let row = getRowScheme({cols: scheme})
          structure.rows.splice(distanceInfo.position[0], 0, row)
          copy.template.structure = structure
          return copy

        case 'Divider':

          if (distanceInfo.elementType === 'Row') {
            let row = getRowScheme({cols: [12]})
            row.cols[0].elements = [
              modules.element.Divider.getScheme({})
            ]
            structure.rows.splice(distanceInfo.position[0], 0, row)
            copy.template.structure = structure
            return copy
          }

        // else default module
        case 'Button':
        case 'Html':
        case 'Image':
        case 'Text':
          let position = distanceInfo.position.concat([0, 0, 0])
          position = position.slice(0, 3)
          scheme = modules.element[originInfo.elementType].getScheme(dragParams)
          structure.rows[position[0]].cols[position[1]].elements.splice(0, 0, scheme)
          copy.template.structure = structure
          return copy
      }
    }

    switch (originInfo.elementType) {
      case 'Row':
        let r1 = originInfo.position.concat([0, 0])
        let r2 = distanceInfo.position.concat([0, 0])

        r1 = r1.slice(0, 1).shift()
        r2 = r2.slice(0, 1).shift()
        r2 = r2 > 0 ? r2 - 1 : 0

        let movedRow = JSON.parse(JSON.stringify(structure.rows[r1]))

        structure.rows.splice(r2, 0, movedRow)
        structure.rows.splice(r1 + 1, 1)

        copy.template.structure = structure
        return copy
      case 'Button':
      case 'Divider':
      case 'Html':
      case 'Image':
      case 'Text':
        let p1 = originInfo.position
        let p2 = distanceInfo.position.concat([0, 0, 0])
        p2 = p2.slice(0, 3)

        let movedElement = structure.rows[p1[0]].cols[p1[1]].elements.splice(p1[3], 1).pop()
        movedElement = JSON.parse(JSON.stringify(movedElement))
        structure.rows[p2[0]].cols[p2[1]].elements.splice(p2[3], 0, movedElement)

        copy.template.structure = structure
        return copy
    }

    console.log('MOVE.2', originInfo, distanceInfo, dragParams)

    return copy
  },
  [CHANGE_ELEMENT_PROPERTY]: (state, action) => {
    let copy = {...state}

    let structure = copy.template.structure
    let elementId = action.elementId
    let updatePropertyParams = action.propertyParams
    let updateElement

    switch (elementId) {
      case 'body':
        structure.body = structure.body || {}
        updateElement = structure.body
        break
      default:
        updateElement = getElementById(copy, elementId, true)
        break
    }

    if (updateElement && !updatePropertyParams.data) {
      updateElement.styles = updateElement.styles || {}

      for (let propertyType in updatePropertyParams) {
        updateElement.styles[propertyType] = updateElement.styles[propertyType] || {}
        Object.assign(updateElement.styles[propertyType], updatePropertyParams[propertyType])
      }
    }

    if (updateElement && updatePropertyParams.data) {
      Object.assign(updateElement.data, updatePropertyParams.data)
    }

    if (updateElement) {
      updateElement.styles = JSON.parse(JSON.stringify(updateElement.styles))
    }

    // todo performance
    // update palette
    if (updateElement) {
      copy.colorPalette = getPalette(copy.template.structure)
    }

    return copy
  },
  [DELETE_ELEMENT]: (state, action) => {
    let copy = {...state}
    let elementInfo = getElementInfoById(action.elementId)
    let structure = copy.template.structure
    copy.activeElementId = ''

    // todo fix it
    switch (elementInfo.position.length) {
      case 1:
        structure.rows.splice(elementInfo.position[0], 1)
        break
      case 3:
        structure.rows[elementInfo.position[0]].cols[elementInfo.position[1]].elements.splice(elementInfo.position[2], 1)
    }

    return copy
  },
  [CLONE_ELEMENT]: (state, action) => {
    let copy = {...state}
    let elementInfo = getElementInfoById(action.elementId)
    let structure = copy.template.structure

    // todo fix it
    switch (elementInfo.position.length) {
      case 1:
        structure.rows.splice(elementInfo.position[0], 0, JSON.parse(JSON.stringify(structure.rows[elementInfo.position[0]])))
        break

      case 3:
        let elements = structure.rows[elementInfo.position[0]].cols[elementInfo.position[1]].elements
        let element = elements[elementInfo.position[2]]
        elements.splice(elementInfo.position[2], 0, JSON.parse(JSON.stringify(element)))
    }

    return copy
  }
}

export default createReducer(initialState, actionHandlers)
