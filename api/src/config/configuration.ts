export default () => ({
  api: {
    port: process.env.API_PORT || 3000,
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3036,
    logging: process.env.TYPEORM_LOGGING === 'true',
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    dropSchema: process.env.TYPEORM_DROP_SCHEMA === 'true',
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    autoLoadEntities: true,
  }
})
