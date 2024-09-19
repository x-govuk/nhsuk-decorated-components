const assert = require('node:assert/strict')
const test = require('node:test')
const nunjucks = require('nunjucks')
const { decorate } = require('../../lib/decorate.js')

const env = nunjucks.configure([
  './',
  './node_modules/nhsuk-frontend/packages',
  './test/fixtures'
])
env.addGlobal('decorate', decorate)

const data = {
  data: {
    account: {
      'email-address': 'test@example.org'
    },
    country: 'england',
    'passport-issued': {
      day: '31',
      month: '12',
      year: '1999'
    },
    status: 'published'
  },
  name: 'Aneurin Bevan'
}

test('Returns form component without decorate attribute', () => {
  const result = env.render('input-not-decorated.njk', data)

  assert.match(result, /id=""/)
  assert.match(result, /name=""/)
})

test('Returns form component without any session data', () => {
  const result = env.render('input.njk', {})

  assert.match(result, /Email address/)
  assert.match(result, /for="account-email-address"/)
  assert.match(result, /id="account-email-address"/)
  assert.match(result, /name="\[account\]\[email-address\]"/)
  assert.doesNotMatch(result, /value/)
})

test('Decorates form component from session data', (t) => {
  const result = env.render('input.njk', data)

  assert.match(result, /for="account-email-address"/)
  assert.match(result, /id="account-email-address"/)
  assert.match(result, /name="\[account\]\[email-address\]"/)
  assert.match(result, /value="test@example.org"/)
})

test('Returns form component without any local data', () => {
  const result = env.render('input-locals.njk', {})

  assert.match(result, /Name/)
  assert.match(result, /for="name"/)
  assert.match(result, /id="name"/)
  assert.match(result, /name="\[name\]"/)
  assert.doesNotMatch(result, /value/)
})

test('Decorates form component from local data', (t) => {
  const result = env.render('input-locals.njk', data)

  assert.match(result, /Name/)
  assert.match(result, /for="name"/)
  assert.match(result, /id="name"/)
  assert.match(result, /name="\[name\]"/)
  assert.match(result, /value="Aneurin Bevan"/)
})

test('Decorates form component with items', () => {
  const result = env.render('radios.njk', data)

  assert.match(result, /for="country-1"/)
  assert.match(result, /for="country-2"/)
  assert.match(
    result,
    /id="country-1".*name="\[country\].*value="england".*checked/
  )
  assert.match(result, /id="country-2".*name="\[country\].*value="scotland"/)
})

test('Decorates form component with items (data stored in array)', () => {
  const result = env.render('radios.njk', {
    data: { country: ['england'] }
  })

  assert.match(result, /for="country-1"/)
  assert.match(result, /for="country-2"/)
  assert.match(
    result,
    /id="country-1".*name="\[country\].*value="england".*checked/
  )
  assert.match(result, /id="country-2".*name="\[country\].*value="scotland"/)
})

test('Decorates button component', () => {
  const result = env.render('button.njk', data)

  assert.match(result, /name="\[status\]"/)
  assert.match(result, /value="published"/)
})

test('Does not decorate button link component', () => {
  const result = env.render('button-href.njk', data)

  assert.doesNotMatch(result, /name="\[status\]"/)
  assert.doesNotMatch(result, /value="published"/)
})

test('Uses label text if no value given for option', () => {
  const result = env.render('radios-no-values.njk', data)

  assert.match(result, /id="country-1".*name="\[country\].*value="England"/)
  assert.match(result, /id="country-2".*name="\[country\].*value="Scotland"/)
  assert.match(result, /id="country-3".*name="\[country\].*value="Wales"/)
  assert.match(
    result,
    /id="country-4".*name="\[country\].*value="Northern Ireland"/
  )
  assert.match(
    result,
    /id="country-6".*name="\[country\].*value="Another country"/
  )
})

test('Decorates date input component', () => {
  const result = env.render('date-input.njk', data)

  assert.match(result, /for="passport-issued-day"/)
  assert.match(result, /for="passport-issued-month"/)
  assert.match(result, /for="passport-issued-year"/)
  assert.match(
    result,
    /id="passport-issued-day".*name="\[passport-issued\]\[day\].*value="31"/
  )
  assert.match(
    result,
    /id="passport-issued-month".*name="\[passport-issued\]\[month\].*value="12"/
  )
  assert.match(
    result,
    /id="passport-issued-year".*name="\[passport-issued\]\[year\].*value="1999"/
  )
})

test('Strips data from key path', () => {
  const result = env.render('input-data-in-key-path.njk', data)

  assert.match(result, /for="account-email-address"/)
  assert.match(result, /id="account-email-address"/)
  assert.match(result, /name="\[account\]\[email-address\]"/)
  assert.match(result, /value="test@example.org"/)
})

test('Add message if error', () => {
  const result = env.render('input.njk', {
    ...data,
    ...{
      errors: {
        'account.email-address': {
          msg: 'Enter an email address in the correct format'
        }
      }
    }
  })

  assert.match(result, /id="account-email-address-error"/)
  assert.match(result, /Error:/)
  assert.match(result, /Enter an email address in the correct format/)
  assert.match(result, /aria-describedby="account-email-address-error"/)
})
