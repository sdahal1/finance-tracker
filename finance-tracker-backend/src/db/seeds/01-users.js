const users = require("../fixtures/users");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   await knex('users').del()
//   await knex('users').insert(users);
// };

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("users").insert([]);
    });
};
