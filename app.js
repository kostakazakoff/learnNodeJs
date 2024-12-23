const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const Blog = require('./models/blog');

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
app.use(morgan('dev')); // logging requests

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Home',
        blogs: [
            { title: 'Kosta', snippet: 'Kosta Alabala', body: 'Alabala' },
            { title: 'Marina', snippet: 'Marina Alabala', body: 'Alabala' },
            { title: 'Tedi', snippet: 'Tedi Alabala', body: 'Alabala' },
        ],
    });
});

app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About'
    });
});

// redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('about');
// });

app.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: 'New Blog'
    });
});

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog',
        snippet: 'about my new blog',
        body: 'my new blog body'
    });

    blog.save();
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});