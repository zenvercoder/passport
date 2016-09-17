var knex = require('./knex');

function newPost(){
  return knex('blog_post');
}

function addPost (title, body)
{
  if (!title || !body)
  {
    return false
  }
  return newPost().insert({
    title: title,
    body: body
  });

}

module.exports = {
  add: addPost
};

