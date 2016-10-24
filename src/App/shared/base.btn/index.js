import React from 'react'
import { css, StyleSheet } from 'aphrodite'

const BaseBtn = ({
  children,
  className,
  ...rest
}) =>
  <button {...{
    ...rest,
    className: `${css(styles.base)} ${className}`
  }}>
    { children }
  </button>

const styles = StyleSheet.create({
  base: {
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    textDecoration: 'none'
  }
})

export default BaseBtn
