/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("users", (table) => {
    // table.renameColumn("product_name", "product_title");
    table.string("confirm_password");  // Add a new column
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("users", (table) => {
    // table.renameColumn("product_title", "product_name");
    table.dropColumn("confirm_password");
  });
};
