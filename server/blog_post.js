var knex = require('./knex');

function Posts(){
  return knex('blog_post');
}

function addPost (title, body, user_id)
{
  if (!title || !body)
  {
    return false
  }
  return Posts().insert({
    title: title,
    body: body,
    user_id: user_id
  });

}

function getPost(id){
  return Posts().where('id', id).first();

}


module.exports = {
  add: addPost,
  getPosts: Posts,
  getPost: getPost
};

