import test from 'ava'
import { transitionTo, replaceWith, updateQuery, replaceQuery } from './actions'

test('transitionTo action tests', t => {
  const action = transitionTo('/test')
  t.is(action.payload.method, 'pushState')
  t.same(action.payload.args, [null, '/test', {}])
})

test('replaceWith action tests', t => {
  const action = replaceWith('/test')
  t.is(action.payload.method, 'replaceState')
  t.same(action.payload.args, [null, '/test', {}])
})

const dispatch = _ => _
const getState = _ => ({
  router: {
    location: {
      pathname: '/test'
    }
  }
})

test('updateQuery action tests', t => {
  const action = updateQuery({test: 1})(dispatch, getState)
  t.is(action.payload.method, 'pushState')
  t.same(action.payload.args, [null, '/test', {test: 1}])
})

test('replaceQuery action tests', t => {
  const action = replaceQuery({test: 1})(dispatch, getState)
  t.is(action.payload.method, 'replaceState')
  t.same(action.payload.args, [null, '/test', {test: 1}])
})
