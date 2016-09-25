var knex = require('./knex');

function Comments() {
    return knex('comments');
}


function addComment(post_id, user_id, comment_body) {
    if (!comment_body) {
        return false;
    }
    return Comments().insert({
        blog_post_id: post_id,
        user_id: user_id,
        body: comment_body
    });
}

function getComment(id) {
    return Comments().where('comments.id', id)
        .join('users','comments.user_id', '=', 'users.id')
        .select('comments.body', 'comments.created_at', 'comments.updated_at', 'comments.upvote_count',
            'comments.user_id','users.username','comments.id')
        .first();
}

function getComments(post_id) {
    if (!post_id) {
        return Comments()
            .orderBy('comments.id');
    }
    else {
        return Comments().where('blog_post_id', post_id)
            .join('users','comments.user_id', '=', 'users.id')
            .select('comments.body', 'comments.created_at', 'comments.updated_at', 'comments.upvote_count',
                'comments.user_id','users.username','comments.id')
            .orderBy('id');
    }
}

function updateComment(comment) {
    return Comments().where('id', comment.id)
        .update({
            body: comment.body
        })
        .then(function(){
            return Comments().where('id', comment.id).first();
        });
}

function deleteComment(comment_id) {
    return Comments().where('id', comment_id)
        .del();
}

module.exports = {
    add: addComment,
    getComments: getComments,
    getComment: getComment,
    updateComment: updateComment,
    deleteComment: deleteComment
};

