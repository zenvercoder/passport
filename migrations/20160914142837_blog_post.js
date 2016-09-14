exports.up = function(knex, Promise) {
    return knex.schema.createTable('blog_post', (table) => {
        // increments is a keyword of knex
        table.increments();
        // foreign key pointing to users primary key
        table.integer('user_id').references('id').inTable('users');

        table.text('title');
        table.text('body');
        table.timestamps();
        table.integer('upvote_count');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('blog_post');
};

