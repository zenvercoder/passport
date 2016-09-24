var knex = require('./knex');

function Posts() {

    return knex('blog_post');
}


function addPost(title, body, user_id) {
    if (!title || !body) {
        return false
    }
    return Posts().insert({
        title: title,
        body: body,
        user_id: user_id
    });

}

function getPost(id) {
    return Posts().where('blog_post.id', id)
        .join('users','blog_post.user_id', '=', 'users.id')
        .select('blog_post.body', 'blog_post.created_at', 'blog_post.updated_at', 'blog_post.upvote_count',
            'blog_post.user_id', 'blog_post.title', 'users.username','blog_post.id')
        .first();

}

function getPosts() {
    return Posts()
        .join('users','blog_post.user_id', '=', 'users.id')
        .select('blog_post.body', 'blog_post.created_at', 'blog_post.updated_at', 'blog_post.upvote_count',
            'blog_post.user_id', 'blog_post.title', 'users.username','blog_post.id')
        .orderBy('id', 'desc');
}


function updatePost(post) {
    return Posts().where('id', post.id)
        .update({
            body: post.body
        })
}

function deletePost(post_id) {
    return Posts().where('id', post_id)
        .del();
}


module.exports = {
    add: addPost,
    getPosts: getPosts,
    getPost: getPost,
    updatePost: updatePost,
    deletePost: deletePost
};

