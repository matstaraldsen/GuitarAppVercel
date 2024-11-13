const Sequelize = require('sequelize')
const fs = require("fs")
const path = require("path")
const basename = path.basename(__filename);
require('dotenv').config()
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.ADMIN_USERNAME,
  process.env.ADMIN_PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    dialectModule: require('mysql2'), // Ensure this uses `dialectModule`
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Adjust based on your Aiven SSL requirements
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
const db = {}
db.sequelize = sequelize
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) &&   
      (file.slice(-3) === '.js');
    })
  .forEach(file => {    
    const model = require(path.join(__dirname, file))(sequelize,   
      Sequelize);
    db[model.name] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
module.exports = db
