/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id").primary(); // Sets user_id as the primary key
    table.string("first_name");
    table.string("last_name");
    table.string("email");
    table.text("password");
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
