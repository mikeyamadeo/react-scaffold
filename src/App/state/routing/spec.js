import test from 'ava'
import { transitionTo, replaceWith, updateQuery, replaceQuery } from './actions'

const dispatch = (test) => test

const getState = () => ({
  router: {
    location: {
      pathname: '/test'
    }
  }
})

test('transitionTo action tests', (t) => {
  const action = transitionTo('/test')
  t.is(action.payload.method, 'push')
  t.deepEqual(action.payload.args, [null, '/test', {}])
})

test('replaceWith action tests', (t) => {
  const action = replaceWith('/test')
  t.is(action.payload.method, 'replace')
  t.deepEqual(action.payload.args, [null, '/test', {}])
})

test('updateQuery action tests', (t) => {
  const action = updateQuery({test: 1})(dispatch, getState)
  t.is(action.payload.method, 'push')
  t.deepEqual(action.payload.args, [null, '/test', {test: 1}])
})

test('replaceQuery action tests', (t) => {
  const action = replaceQuery({test: 1})(dispatch, getState)
  t.is(action.payload.method, 'replace')
  t.deepEqual(action.payload.args, [null, '/test', {test: 1}])
})
