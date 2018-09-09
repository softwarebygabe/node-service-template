export = {
    client: 'pg',
    dev: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'localuser',
            password: 'dev',
            database: 'devdb',
        },
        migrations: {
            directory: './migrations',
        },
    },
    prod: {},
};
