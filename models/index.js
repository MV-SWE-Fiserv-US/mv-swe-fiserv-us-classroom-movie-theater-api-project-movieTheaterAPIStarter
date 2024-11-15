const Show = require('./Shows')
const User = require('./Users')

Show.belongsToMany(User, { through: 'watched' })
User.belongsToMany(Show, { through: 'watched' })

module.exports = {
  Show,
  User
}
