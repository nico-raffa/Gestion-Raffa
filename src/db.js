import { Sequelize } from 'sequelize'
export const sequelize = new Sequelize('sistemaraffa', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // El dialecto debe ser 'mysql' para MySQL
  define: {
    foreignKeys: true
  },
  port: 3308
});
sequelize.sync()
  .then(() => {
    return true
  })
  .catch((error) => {
    return error
  })