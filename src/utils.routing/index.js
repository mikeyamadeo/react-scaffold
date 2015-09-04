let _router = null

export default {
  set,
  get,
  getCurrent,
  transitionTo,
  replaceWith,
  getQueryValue,
  updateQueryValue
}

// ////////////////////////////////////////////////////////////////////////////////
//

function set (router) {
  _router = router
}

function get () {
  return _router
}

function transitionTo (...config) {
  _router.transitionTo.apply(null, config)
}

function replaceWith (...config) {
  _router.replaceWith.apply(null, config)
}

function getCurrent () {
  return {
    path: _router.getCurrentPath(),
    pathname: _router.getCurrentPathname(),
    params: _router.getCurrentParams(),
    query: _router.getCurrentQuery(),
    routes: _router.getCurrentRoutes()
  }
}

function getQueryValue (key) {
  return getCurrent().query[key]
}

function updateQueryValue (key, value) {
  const { pathname } = getCurrent()

  transitionTo(pathname, {}, { [key]: value })
}