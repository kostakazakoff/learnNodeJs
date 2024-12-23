const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

const app = express();

// MongoDB connection URI
const dbURI = process.env.MONGODBURI;
mongoose.connect(dbURI)
    .then(result => app.listen(3000))
    .catch(err => console.error(err));

// register view engine
app.set('view engine', 'ejs');

// set views folder (when different from 'views')
// app.set('view engine', 'views_folder');

// middleware
app.use(express.static('public')); //static files
app.use(express.urlencoded({ extended: true })); // requests url encoding - to object
app.use(morgan('dev')); // logging requests

// redirect
app.get('/', function (req, res) {
    res.redirect('/blogs');
});

app.get('/about', function (req, res) {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});