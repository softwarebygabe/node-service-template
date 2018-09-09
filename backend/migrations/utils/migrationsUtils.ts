export async function buildTable(knex, tableName: string, tableFn: Function) {
    return knex.schema.createTableIfNotExists(tableName, table => {
        table.uuid('id')
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .notNullable()
            .primary();
        tableFn(table);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.timestamp('deletedAt');
    });
}
