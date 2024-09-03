require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const {engine} = require('express-handlebars');
const methodOverride = require('method-override');

const client = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.engine('.hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: new SequelizeStore({
        db: client,
      }),
      saveUninitialized: false,
      resave: false, 
      proxy: true, 
      cookie: {
        httypOnly: true
      }
    })
  );

app.use('/', routes);

client.sync({force:false})
    .then( () => {
        app.listen(PORT, () => {
            console.log('Server has started on Port', PORT);
        })
    });