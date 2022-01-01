const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const path = require('path')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({})
const session = require('express-session')
const sequelizeStore = require('connect-session-sequelize')(session.Store)
const app = express()
const PORT = process.env.PORT || 3001
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
}

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(session(sess))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

// turn on routes
app.use(routes)

// turn on connection to db and server
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now Listening'))
})