export function formatQuery(params) {
  try {
    const isString = str => typeof str === 'string' && str !== null
    const isObject = obj => typeof obj === 'object' && obj !== null

    let query = ''
    if (isObject(params)) {
      query += '?'
      let q = []
      for (const param in params) {
        if (params[param] || params[param] === 0) {
          q.push(`${param}=${params[param]}`)
        }
      }
      q = q.join('&')
      query += q
    } else if (isString(params)) {
      query += '?' + params
    }

    return query
  } catch (error) {
    console.error(error)
  }
}

export function openNewTab({url, target}) {
  try {
    window.open(url, target)
  } catch (error) {
    console.error(error)
  }
}
