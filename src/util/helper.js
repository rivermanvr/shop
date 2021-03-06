export const $ = num => '$' + parseFloat(Math.round(num * 100) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const subCalc = lineItems => {
  return lineItems && lineItems.reduce((sum, ln) => {
    sum += ln.quantity * (ln.price || ln.product.price)
    return sum
  }, 0)
}

export const longDate = dateStr => {
  const
    date = new Date(dateStr),
    locale = "en-us",
    month = date.toLocaleString(locale, { month: "short" }),
    day = date.getUTCDate(),
    year = date.getUTCFullYear()
  return `${month} ${day}, ${year}`
}

export const validateAddress = user => {
  let result = true
  ;['Address', 'State', 'City', 'ZIP']
  .forEach(prop => {
    if (!user[prop] || user[prop].length < 1) result = false
  })

  return result
}
