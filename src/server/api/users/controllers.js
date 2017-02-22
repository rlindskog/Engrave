import User from './models'



export function getUsers(req, res) {
  User.find({}, (err, users) => {
    res.json(users)
  })
}

// export function putUsers(req, res) {
//   User.find({}, (err, users) => {
//     res.json(users)
//   })
// }

export function login(req, res) {
  res.json({ msg: 'This will be login...' })
}

export function setup(req, res) {
  let ryan = new User({
    username: 'rlindskog',
    password: 'pass123',
    something: 'ok'
  })
  ryan.save(err => {
    if (err) throw err
    console.log('user saved successfully')
    res.json({ success: true })
  })
}
