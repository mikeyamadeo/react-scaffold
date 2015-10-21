import style from './style'
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { capitalize } from 'utils.rendering'
import Flex from 'obj.Flexbox'

const CenteredColumn = ({children, ...props}) =>
  <Flex direction='column' align='center' { ...props }>
    { children }
  </Flex>

const Stack = ({specs}) =>
  <CenteredColumn styleName='container'>
    <h1 styleName='h1'>
      made with &#9829; and
    </h1>
    <CenteredColumn tag='ul' styleName='list'>
      { specs.map((item, i) =>
        <li key={i} styleName='list-item'>
          { capitalize(item) }
        </li>
      )}
    </CenteredColumn>
  </CenteredColumn>

Stack.propTypes = {
  specs: PropTypes.array
}

export default connect(state => ({
  specs: state.appSpecs
}))(CSSModules(Stack, style))
