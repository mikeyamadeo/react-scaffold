import { css } from 'aphrodite'

export const cssIf = (styleSheet, ...params) => {
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

export const capitalize = (string) => string.split(' ').map(str =>
  str.charAt(0).toUpperCase() + str.slice(1)
).join(' ')
