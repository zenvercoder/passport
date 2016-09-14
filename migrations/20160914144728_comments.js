exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', (table) => {
        table.increments();
        // foreign key pointing to users primary key
        table.integer('user_id').references('id').inTable('users');
        // foreign key pointing to blog_post primary key
        table.integer('blog_post_id').references('id').inTable('blog_post');
        // to limit comment length
        table.string('body', 140);
        table.timestamps();
        table.integer('upvote_count');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');
};