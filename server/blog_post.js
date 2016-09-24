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

function getPosts(){
  return Posts().orderBy('id', 'desc')
}


function updatePost(post){
    return Posts().where('id', post.id)
        .update({
          body: post.body
        })
}


module.exports = {
  add: addPost,
  getPosts: getPosts,
  getPost: getPost,
  updatePost: updatePost
};

