export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    scheme: process.env.MONGODB_SCHEME || 'mongodb',
    host: process.env.MONGODB_HOST || 'localhost',
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    port: process.env.MONGODB_PORT,
    databaseName: process.env.MONGODB_DATABASE_NAME,
    options: process.env.MONGODB_OPTIONS,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0', 10),
  },
});
