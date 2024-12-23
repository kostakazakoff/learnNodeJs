const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(data => {
            res.render('blogs/index', { title: 'All blogs', blogs: data });
        })
        .catch(err => res.status(404).render('404', { title: 'Something went wrong!' }));
};

const blog_details = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(data => res.render('blogs/details', { blog: data, title: 'Blog Details' }))
        .catch(err => res.status(404).render('404', {title: 'Blog not found!'}));
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'New Blog' });
};

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(result => res.redirect('/'))
        .catch(err => res.status(404).render('404', { title: 'Something went wrong!' }));
};

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => res.json({redirect: '/blogs'}))
        .catch(err => res.status(404).render('404', { title: 'Something went wrong!' }));
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}