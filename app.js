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
app.use(express.urlencoded({extended: true})); // requests url encoding - to object
app.use(morgan('dev')); // logging requests

// redirect
app.get('/', function (req, res) {
    res.redirect('/blogs');
});

app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About'
    });
});

// blogs routes

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1}) // sort by createdAt descending
    .then(data => {
        res.render('index', {title: 'All blogs', blogs: data});
    })
    .catch(err => {console.log(err)});
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then(result => res.redirect('/blogs'))
    .catch(err => {console.log(err)});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: 'New Blog'
    });
});

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog 3',
        snippet: 'about my new blog',
        body: 'my new blog body'
    });

    blog.save()
        .then(data => res.send(data))
        .catch(err => console.log(err));
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

app.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findById(id)
    .then(data => res.render('details', {blog: data, title: 'Blog Details'}))
    .catch(err => console.log(err));
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});