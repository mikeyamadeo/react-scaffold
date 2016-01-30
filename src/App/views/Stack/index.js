import style from './style'
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { capitalize } from 'utils.rendering'
import { Y } from 'obj.Layout'

const Stack = ({specs}) =>
  <Y styleName='container'>
    <h1 styleName='h1'>
      made with &#9829; and
    </h1>
    <Y tag='ul' styleName='list'>
      { specs.map((item, i) =>
        <li key={i} styleName='list-item'>
          { capitalize(item) }
        </li>
      )}
    </Y>
  </Y>

Stack.propTypes = {
  specs: PropTypes.array
}

export default connect(state => ({
  specs: state.appSpecs
}))(CSSModules(Stack, style))
