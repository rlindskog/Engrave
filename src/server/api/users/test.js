import mocha from 'mocha'
import assert from 'assert'
import User from './models'

describe('Saving records', () => {
  it('Saves a record to the the database.', () => {
    let newUser = new User({
      username: 'Mario',
      password: 'pass123',
      admin: false
    })
    newUser.save()
      .then(() => {
        assert(newUser.isNew === false)
        mocha.done()
      })
  })
})
