const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-apt-app', 'root', 'archiesql', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;