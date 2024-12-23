const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(data => {
            res.render('index', { title: 'All blogs', blogs: data });
        })
        .catch(err => { console.log(err) });
});

router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(result => res.redirect('/blogs'))
        .catch(err => { console.log(err) });
});

router.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: 'New Blog'
    });
});

router.get('/blog/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(data => res.render('details', { blog: data, title: 'Blog Details' }))
        .catch(err => console.log(err));
});

router.delete('/blog/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    Blog.findByIdAndDelete(id)
        .then(result => res.json({redirect: '/blogs'}))
        .catch(err => console.log(err));
});

module.exports = router;