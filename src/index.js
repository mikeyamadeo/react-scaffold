import React from 'react'
import Router from 'react-router'
import configureStore from './redux.store'
import { Provider } from 'react-redux'
import routes from './config.routes'
import routingUtils from './utils.routing'

const store = configureStore()

const cb = function (Handler, routerState) {
  React.render(
    <Provider store={store}>
      { () => <Handler {...{routerState}}/> }
    </Provider>,
    document.getElementById('app')
  )
}

const router = Router.create({
  routes
})

/**
 * Circumvent the circular dependency so routing functions
 * can be used outside of components.
 */
routingUtils.set(router)

router.run(cb)
