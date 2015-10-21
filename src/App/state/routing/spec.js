import expect from 'expect'

import { transitionTo, replaceWith, updateQuery, replaceQuery } from './actions'

const { describe, it } = window

describe('-- Routing Action Tests', () => {

  it('-- transitionTo Action Tests', done => {

    const action = transitionTo('/test')

    expect(action.payload.method).toEqual('pushState')
    expect(action.payload.args).toEqual([null, '/test', {}])

    done()
  })

  it('-- replaceWith Action Tests', done => {

    const action = replaceWith('/test')

    expect(action.payload.method).toEqual('replaceState')
    expect(action.payload.args).toEqual([null, '/test', {}])

    done()
  })

  const dispatch = _ => _
  const getState = _ => ({
    router: {
      location: {
        pathname: '/test'
      }
    }
  })

  it('-- updateQuery Action Tests', done => {

    const action = updateQuery({test: 1})(dispatch, getState)

    expect(action.payload.method).toEqual('pushState')
    expect(action.payload.args).toEqual([null, '/test', {test: 1}])

    done()
  })

  it('-- replaceQuery Action Tests', done => {

    const action = replaceQuery({test: 1})(dispatch, getState)

    expect(action.payload.method).toEqual('replaceState')
    expect(action.payload.args).toEqual([null, '/test', {test: 1}])

    done()
  })

})
