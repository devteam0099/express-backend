const express = require('express')
require('dotenv').config()
const {dbConnection} = require('./config/postgres.config.js')
const catagoryRoute  =require('./routes/catagoryRoutes.js')
const userRoute = require('./routes/userRoutes.js')
const faqRoute = require('./routes/faqRoutes.js')
const cookieParser = require('cookie-parser')

const app = express()
dbConnection()
app.use(express.json())
app.use(cookieParser())
app.get('/',(req,res)=>{res.send('hello world!')})

app.use('/api/faq',faqRoute)
app.use('/api/catagory',catagoryRoute)
app.use('/api/users',userRoute)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})