module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'projetointegrador2',
    user: process.env.DB_USER || 'projetointegrador2',
    password: process.env.DB_PASS || 'projetointegrador2',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage:  './projetointegrador2.sqlite'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
