import React, { PropTypes } from 'react'
import { StyleSheet, css } from 'aphrodite'

const cssIf = (styleSheet, ...params) => {
  let styles = []

  params.forEach((p) => {

    const fromStylesheet = !!p._name

    if (fromStylesheet) {
      styles.push(p)
    } else {
      for (let key in p) {
        if (p.hasOwnProperty(key) && p[key]) {
          styles.push(styleSheet[key])
        }
      }
    }
  })

  return css.apply(null, styles)
}

const Flexbox = ({tag = 'div', children, direction, wrap, justify, align, ...props}) => {
  const Tag = tag
  return (
    <Tag { ...props } className={cssIf(style, style.Flex, {
      [`Direction-${direction}`]: !!direction,
      [`Wrap-${wrap}`]: !!wrap,
      [`Justify-${justify}`]: !!justify,
      [`Align-${align}`]: !!align
    })}>

      { children }

    </Tag>
  )
}

Flexbox.propTypes = {
  direction: PropTypes.oneOf(['column', 'row-reverse']),
  wrap: PropTypes.oneOf(['wrap', 'wrap-reverse']),
  justify: PropTypes.oneOf(['end', 'center', 'space-between']),
  align: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object
  ])
}

export default Flexbox

const style = StyleSheet.create({
  Flex: {
    display: 'flex'
  },
  'Direction-column': {
    flexDirection: 'column'
  },
  'Direction-row-reverse': {
    flexDirection: 'row-reverse'
  },
  'Wrap-wrap': {
    flexWrap: 'wrap'
  },
  'Wrap-wrap-reverse': {
    flexWrap: 'wrap-reverse'
  },

 /**
  * Align Items
  */
  'Align-start': {
    alignItems: 'flex-start'
  },
  'Align-end': {
    alignItems: 'flex-end'
  },
  'Align-center': {
    alignItems: 'center'
  },
  'Align-stretch': {
    alignItems: 'stretch'
  },

 /**
  * Justify Content
  */
  'Justify-end': {
    justifyContent: 'flex-end'
  },
  'Justify-center': {
    justifyContent: 'center'
  },
  'Justify-space-between': {
    justifyContent: 'space-between'
  }

})
