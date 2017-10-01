import {
  CHANGE_ELEMENT_PROPERTY,
  CLONE_ELEMENT,
  DELETE_ELEMENT,
  INIT,
  INIT_UPDATE,
  OPEN_PREVIEW,
  CLOSE_PREVIEW,
  MOVE_ELEMENT,
  RESET_TEMPLATE_CHANGES,
  SET_ACTIVE_ELEMENT_ID,
  SET_ACTIVE_PANEL_TAB,
  SET_OVER_ELEMENT_ID
} from './actionTypes'

export const init = (props) => {
  return {
    type: INIT,
    props: {...props, isFetching: false}
  }
}

export const initUpdate = (props) => {
  return {
    type: INIT_UPDATE,
    props
  }
}

export const resetTemplateChanges = () => {
  return {
    type: RESET_TEMPLATE_CHANGES
  }
}

export const openPreview = (dispatch) => {
  return {
    type: OPEN_PREVIEW,
    dispatch
  }
}

export const closePreview = () => {
  return {
    type: CLOSE_PREVIEW
  }
}

export const setActivePanelTab = (panelTabName) => {
  return {
    type: SET_ACTIVE_PANEL_TAB,
    panelTabName
  }
}

export const onChangeProperty = (elementId, propertyParams) => {
  return {
    type: CHANGE_ELEMENT_PROPERTY,
    elementId,
    propertyParams
  }
}

export const setActiveElement = (elementId) => {
  return {
    type: SET_ACTIVE_ELEMENT_ID,
    elementId
  }
}

export const setOverElement = (elementId) => {
  return {
    type: SET_OVER_ELEMENT_ID,
    elementId
  }
}

export const moveElement = (fromId, toId, params) => {
  return {
    type: MOVE_ELEMENT,
    fromId,
    toId,
    params
  }
}

export const deleteElementById = (elementId) => {
  return {
    type: DELETE_ELEMENT,
    elementId
  }
}

export const cloneElementById = (elementId) => {
  return {
    type: CLONE_ELEMENT,
    elementId
  }
}
