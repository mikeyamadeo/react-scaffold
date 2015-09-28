import style from './style'
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { capitalize } from 'utils.rendering'
import { initApp } from './state/actions'
import Flex from 'obj.Flexbox'

const App = React.createClass({

  propTypes: {
    initialize: PropTypes.func,
    specs: PropTypes.array
  },

  componentDidMount () {
    const { initialize } = this.props
    initialize()
  },

  renderItems (items) {
    return items.map((item, i) => (
      <li key={i} styleName='list-item'>
        { capitalize(item) }
      </li>
    ))
  },

  render () {
    const { props, renderItems } = this
    const { specs } = props

    return (
      <Flex styleName='container' direction='column' align='center'>
        <h1 styleName='h1'>made with &#9829; and</h1>
        <Flex tag='ul' styleName='list' direction='column' align='center'>
          { renderItems(specs) }
        </Flex>
      </Flex>
    )
  }

})

export default connect(selector, boundActions)(CSSModules(App, style))

function selector (state) {
  return {
    specs: state.appSpecs || []
  }
}

function boundActions (dispatch) {
  return {
    initialize: () => dispatch(initApp())
  }
}
