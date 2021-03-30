if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const checkUser = require('./middlewares/checkuser')



// Global middleware


const indexRouter = require('./routes/home/index')
const authRouter = require('./routes/auth/signup')
const loginRouter = require('./routes/auth/signin')
const adminRouter = require('./routes/admin/admin-upload')



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json())

// Database connection

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});


app.get('*', checkUser);
app.use('/', indexRouter)
app.use('/signup', authRouter)
app.use('/signin', loginRouter)
app.use('/admin', adminRouter)

app.listen()
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Started at Port 3000`)
})