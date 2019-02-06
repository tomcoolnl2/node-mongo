
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// New Code
const monk = require('monk')
const db = monk('mongo:27017/nodetest1')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()
const port = process.env.PORT || 666

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Make our db accessible to our router
app.use((req,res,next) => {
    req.db = db
    next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// listen to port
app.listen(port, () => {
  console.log('Example app listening on port ' + port + '!')
})

module.exports = app
