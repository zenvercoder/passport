var environment = 'development';

var config = require('../database/knexfile')[environment];

module.exports = require('knex')(config);