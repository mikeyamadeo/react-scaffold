import sys from 'system-components/emotion'

const getWidth = n => !num(n) || n > 1 ? px(n) : n * 100 + '%'
const num = n => typeof n === 'number' && !isNaN(n)
const px = n => num(n) ? n + 'px' : n

const apis = [
  props => ({ height: px(props.h) }),
  props => ({ width: getWidth(props.w) }),
  // core
  'space',
  'width',
  'fontSize',
  'textColor',
  'bgColor',
  // typography
  'textAlign',
  // layout
  'display',
  'maxWidth',
  'minWidth',
  'height',
  'maxHeight',
  'minHeight',
  'size',
  'ratio',
  'verticalAlign',
  // borders
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borders',
  'borderColor',
  'borderRadius',
  // misc
  'boxShadow',
  'opacity',
  'background',
  'backgroundImage',
  'backgroundSize',
  'backgroundPosition',
  'backgroundRepeat',
  // position
  'position',
  'zIndex',
  'top',
  'right',
  'bottom',
  'left'
]

const justifyLogic = key =>
  p => p[key] && { justifyContent: p[key] === 'end' ? 'flex-end' : 'center' }

const alignLogic = key =>
  p =>
    p[key] &&
      {
        alignItems: p[key] === 'end'
          ? 'flex-end'
          : p.x === 'stretch' ? 'stretch' : 'center'
      }

const row = {
  x: justifyLogic('x'),
  y: alignLogic('y'),
  space: p => p.space && { justifyContent: `space-${p.space}` },
  reverse: p => p.reverse && { flexDirection: 'row-reverse' }
}

const col = {
  x: alignLogic('x'),
  y: justifyLogic('y'),
  space: p => p.space && { alignItems: `space-${p.space}` },
  reverse: p => p.reverse && { flexDirection: 'column-reverse' }
}

const wrap = p =>
  p.wrap && { flexWrap: p.wrap === 'reverse' ? 'wrap-reverse' : 'wrap' }

const blacklist = [ 'w', 'h', 'x', 'y', 'reverse', 'wrap', 'space' ]
let Layout = sys(...apis)

Layout.row = sys(
  { is: sys({ blacklist }) },
  { display: 'flex' },
  ...apis,
  row.x,
  row.y,
  row.space,
  row.reverse,
  wrap
)

Layout.row.displayName = 'Row'

Layout.col = sys(
  { is: sys({ blacklist }), mx: -3 },
  { display: 'flex', flexDirection: 'column' },
  ...apis,
  col.x,
  col.y,
  col.space,
  col.reverse,
  wrap
)

Layout.col.displayName = 'Column'

export default Layout
