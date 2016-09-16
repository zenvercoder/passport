var bcrypt = require("bcrypt")
var knex = require('./knex');

function Users(){
  return knex('users');
}

// datastore will be database table instead of an array in memory
var id = 0;

function hashPassword (password)
{
  return bcrypt.hashSync(password, 10)
}

function findUser (name)
{
  return Users().where('username', name);
}

function authenticateUser (username, password)
{
  return findUser(username)
      .then(function(users){
        return bcrypt.compareSync(password, users[0].pass_hash);
      });
}

function addUser (username, password)
{
  if (!username || !password)
  {
    return false
  }
  return Users().insert({
    username: username,
    pass_hash: hashPassword(password),
    //email: ' ',
    can_post: true,
    can_comment: true
  });

}

module.exports = {
  find: findUser,
  authenticate: authenticateUser,
  add: addUser
}
