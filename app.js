const sequelize = require('./util/database');

const cors = require('cors');

const bodyParser = require('body-parser');

const express = require('express');

const app = express();

app.use(cors());

app.use(bodyParser.json());

const adminRoutes = require('./routes/admin');

app.use(adminRoutes);

sequelize.sync({force: true})
    .then(() => {
        app.listen(5000);
    })
    .catch(err => console.log(err));

