const knex = require("../../db/connection");

function list() {
  return knex("users").select("*");
}

function read(user_id){
  return knex("users")
    .select("*")
    .where({user_id})
    .first();
}

function create(user) {
  // Your solution here
  return knex("users")
    .insert(user)
    .returning("*")
    .then(createdRecords=>createdRecords[0]);
}

function update(updatedUser) {
  return knex("users")
    .select("*")
    .where({ user_id: updatedUser.user_id })
    .update(updatedUser, "*");
}

function destroy(user_id) {
  // Your solution here
  return knex("users")
    .where({user_id}).del();
}

function findByEmail(email){
  return knex("users")
    .select("*")
    .where({email})
    .first();
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy,
  findByEmail
};