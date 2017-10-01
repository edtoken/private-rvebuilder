import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

let defaultIsVisible = localStorage.getItem('DevTools:defaultIsVisible')

if (defaultIsVisible === null) {
  localStorage.setItem('DevTools:defaultIsVisible', 1)
  defaultIsVisible = '1'
}

defaultIsVisible = Boolean(parseInt(defaultIsVisible))

export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={defaultIsVisible}>
    <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
  </DockMonitor>
)
