// import express
import express, { response } from 'express' 
import path from 'path'
import todoRoute from './routes/todoroutes.js' 
import connectDB from './config/db.js'
import session from 'express-session'
import authRoutes from './routes/authRoutes.js'
import logger from './middleware/logger.js'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import publicRoutes from './routes/publicRoutes.js'
import flash from 'express-flash'
import methodOverride from 'method-override'


import'./auth/passport.js' 



// .env config
config({path: 'src/config/.env'})

// instantiate express and handle PORT numbers
const app = express()
const PORT = process.env.PORT || 8000

//connect to our DB
connectDB()

// middleware order is important. Keep this session above any function where you are calling this..
app.use(session({
    secret: 'sdfsdfsdfsdf',
    resave: false, 
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: 'mongodb+srv://bananaKing:bananaKing1@bananacluster.zx11myh.mongodb.net/?retryWrites=true&w=majority' })
}))

app.use(cookieParser())

//middleware  ** make sure these are above the routes..
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logger)
app.use(flash())
app.use(express.static('src/public'))
app.use(methodOverride('_method'))

// tell express to set view engine to ejs
app.set('view engine', 'ejs')
app.set('views' , 'src/views')



app.use(passport.initialize())
app.use(passport.session())



//routes
app.use("/auth", authRoutes)
app.use('/todos', todoRoute)
app.use('/', publicRoutes)









app.listen(PORT, console.log(`Server is now running on port ${PORT} 👉 http://localhost:8000/`))

