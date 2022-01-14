const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/api')
const bodyParser = require('body-parser');

//set up express app:

const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://aryans:test1234@cluster0.52xbp.mongodb.net/NodeBlog?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => console.log('connected to db'))
        .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('hello')
});

app.use(express.static('public'));


//app.use(bodyParser.json());
app.use(express.json());

//error handling middleware

//middleware
app.use('/api',router); //attaches /api at the start of every url

app.use((err,req,res,next) => {
    console.log(err);
    res.send({error: err.message});
})

app.get('/about', (req,res) => {
    res.send('Hello i am here')
    console.log('hi aryan')
}) 