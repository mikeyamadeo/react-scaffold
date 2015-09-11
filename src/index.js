import React from 'react'
import Router from 'react-router'
import configureStore from './redux.store'
import { Provider } from 'react-redux'
import routes from './config.routes'
import routing from './utils.routing'

const store = configureStore()

const router = Router.create({
  routes
})

/**
 * Circumvent the circular dependency so routing functions
 * can be used outside of react components.
 */
routing.set(router)

router.run((Handler, routerState) => {
  React.render(
    <Provider store={store}>
      { () => <Handler {...{routerState}}/> }
    </Provider>,
    document.getElementById('app')
  )
})
