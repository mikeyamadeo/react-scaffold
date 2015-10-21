import React from 'react'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

const Debugger = ({store}) => (
  <DebugPanel top right bottom>
    <DevTools store={store} monitor={LogMonitor} />
  </DebugPanel>
)

export default Debugger
