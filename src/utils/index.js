export const pick = (keys, map) => {
  let newObj = {}

  keys.forEach(key => {
    if (typeof map[key] !== 'undefined') newObj[key] = map[key]
  })

  return newObj
}

export const pluck = (keys, map) => {
  let newObj = { ...map }

  keys.forEach(key => delete newObj[key])

  return newObj
}

export const capitalize = string =>
  string
    .split(' ')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ')

export const flatten = collection =>
  collection.reduce((prev, next) => ({ ...prev, ...next }), {})

export const debounce = (func, wait, immediate) => {
  let timeout
  return (...args) => {
    var later = function () {
      timeout = null
      if (!immediate) func(...args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

export const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function (...args) {
    console.log('hi', ...args)
    if (!lastRan) {
      func(...args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func(...args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - lastRan)
      )
    }
  }
}
