exports.up = async function(knex) {
  await knex.schema.createTable("users", users => {
    users.increments();
    users
      .string("username", 128)
      .notNullable()
      .unique();
    users.string("password", 128).notNullable();
    users.string("department", 128);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("users");
};
