export = {
    up: function(knex, Promise) {
        return Promise.all([
            knex.schema.table('knex_migrations', function(table) {
                table.dateTime('deletedAt');
                table.dateTime('updatedAt');
            }),
        ]);
    },
    down: function(knex, Promise) {
        return Promise.all([
            knex.schema.table('knex_migrations', function(table) {
                table.dropColumn('deletedAt');
                table.dropColumn('updatedAt');
            }),
        ]);
    },
};
