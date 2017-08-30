import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Div } from 'glamorous'

import { capitalize } from 'utils/rendering'

const Stack = ({ specs }) => (
  <Div>
    <h1>
      made with <span>♥</span> and
    </h1>
    <Div tag='ul'>
      {specs.map((item, i) => (
        <li key={i}>
          {capitalize(item)}
        </li>
        ))}
    </Div>
  </Div>
)

Stack.propTypes = { specs: PropTypes.array }

const mapStateToProps = ({ appSpecs }) => ({ specs: appSpecs })

export default connect(mapStateToProps)(Stack)
