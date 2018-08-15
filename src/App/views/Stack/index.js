import React from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'
import Box from 'App/shared/Layout'

import { capitalize } from 'utils'

const Stack = ({ specs }) => (
  <Box>
    <Box is='h1' textAlign='center'>
      made with <Box is='span' color='red'>♥</Box> and
    </Box>
    <Box.col is='ul' x>
      {specs.map((item, i) => (
        <Box is='li' p={1} key={i}>
          {capitalize(item)}
        </Box>
        ))}
    </Box.col>
  </Box>
)

Stack.propTypes = { specs: pt.array }

const mapStateToProps = ({ appSpecs }) => ({ specs: appSpecs })

export default connect(mapStateToProps)(Stack)
