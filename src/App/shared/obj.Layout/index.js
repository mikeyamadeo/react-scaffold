import React from 'react'
import Flexbox from 'obj.Flexbox'

export const Flex = Flexbox

const Flexbase = ({
  spaced,
  wrap,
  ...props
}) => {
  const flexProps = {}

  if (spaced) flexProps.justify = 'space-between'
  if (wrap) flexProps.wrap = 'wrap'

  return <Flexbox { ...props } { ...flexProps } />
}

export const X = ({x, y, ...props}) => {
  const flexProps = {}

  if (x) flexProps.align = 'center'
  if (y) flexProps.justify = 'center'

  return <Flexbase { ...{ ...props, ...flexProps } } />
}

export const Y = ({x, y, ...props}) => {
  const flexProps = {
    direction: 'column'
  }

  if (x) flexProps.justify = 'center'
  if (y) flexProps.align = 'center'

  return <Flexbase { ...{ ...props, ...flexProps } } />
}
