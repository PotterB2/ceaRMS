const express = require(`express`)
const cors = require(`cors`)
const bodyParser = require('body-parser')
const authRoutes = require('./src/routes/authRoutes');
const capsCrud = require('./src/routes/capsCrud')



const app = express()


/*Middlewares*/
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))


app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  }));



  const PORT = process.env.PORT || 3005;


app.use('/api', authRoutes)
app.use('/api', capsCrud)

app.listen(PORT,() => {
    console.log(`Listening on port: ${PORT}`)
})