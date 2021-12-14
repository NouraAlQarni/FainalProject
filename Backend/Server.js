const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors")
const mongoose = require("mongoose");
app.use(express.json())


// Router

const citiesRoutes = require('./Routes/citiesRoute')
const countriesRoutes = require('./Routes/countriesRoute')
const placeRoutes = require('./Routes/placeRoute')
const userRoutes = require('./Routes/userRoute')

// Middleware

const {requireUser, checkUser} = require('./Middleware/userMiddleware')

// Use

app.use(cors())
app.use('/city', citiesRoutes)
app.use('/country', countriesRoutes)
app.use('/place', placeRoutes)
app.use(userRoutes)
app.use(requireUser)

// Get

app.get('*',checkUser);



const uri = 'mongodb+srv://NouraSaad:NNooorraaa123@cluster0.w35p9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
connection.once('open', () => console.log('Connected to DB'),
connection.on('disconnected', () => console.log('mongo disconnected')),
connection.on('error', err => {console.log('connection error', err)}))

app.listen(PORT, () => {
    console.log(`Connected on= http://localhost:${PORT}`);
  });


