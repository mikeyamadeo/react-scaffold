import style from './style'
import React, { PropTypes } from 'react'
import cn from 'classnames'
import CSSModules from 'react-css-modules'

const Flexbox = React.createClass({

  propTypes: {
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
  },

  render () {
    const { props } = this
    const { tag, children,
            direction, wrap, justify,
            align } = props
    const $tag = tag || 'div'

    return (
      <$tag { ...props } styleName={cn('Flex', {

        [`Direction-${direction}`]: !!direction,
        [`Wrap-${wrap}`]: !!wrap,
        [`Justify-${justify}`]: !!justify,
        [`Align-${align}`]: !!align

      })}>

        { children }

      </$tag>
    )
  }
})

export default CSSModules(Flexbox, style, {
  allowMultiple: true,
  errorWhenNotFound: false
})
