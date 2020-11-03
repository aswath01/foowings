require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT =  process.env.PORT || 3000
const mongoose= require('mongoose')
const session = require('express-session')
const flash = require ('express-flash')
const { MongoStore } = require('connect-mongo')
const MongoDbStore = require('connect-mongo')(session)
var passport = require('passport')

//db
//ma'am since my lap is not having win 10 so i had to go with atlas not comm server
const url ='mongodb+srv://aswath:qwertyup@cluster0.k6p1o.mongodb.net/foowings?retryWrites=true&w=majority';
mongoose.connect(url, { useeNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,
useFindAndModify:true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('database connected...');
}).catch(err => {
    console.log('connection failed..')
});
//passport

//

let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

//session config
/*app.use(express.cookieParser('secret'));
app.use(express.cookieSession());*/
//var app = express();
//app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(session({
    store: mongoStore,
    secret: 'SECRET',
    resave: false,
    saveUnintialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24}
}))
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req,res,next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})
//connecting template

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine','ejs')
 
require ('./routes/web')(app)



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
