require('dotenv/config');

const dir = process.env.NODE_ENV === 'dev' ? 'src' : 'dist';
const file = process.env.NODE_ENV === 'dev' ? 'ts' : 'js';

module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    migrations: [`./${dir}/shared/infra/typeorm/migrations/*.${file}`],
    cli: {
        "migrationsDir": `./${dir}/shared/infra/typeorm/migrations/`
    }
}
