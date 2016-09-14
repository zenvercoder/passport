exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        // increments is a keyword of knex
        table.increments();
        table.text('username');
        table.text('email');
        table.text('pass_hash');
        table.boolean('can_post');
        table.boolean('can_comment');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};

//table.bigInteger('user_id').unsigned().index().references('id').inTable('users')

