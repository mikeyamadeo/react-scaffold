export const capitalize = (string) => string.split(' ').map(str =>
  str.charAt(0).toUpperCase() + str.slice(1)
).join(' ')

