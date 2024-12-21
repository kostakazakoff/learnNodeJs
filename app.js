const express = require('express');
const { title } = require('process');

const app = express();

// register view engine
app.set('view engine', 'ejs');
// set views folder (when different from 'views')
// app.set('view engine', 'views_folder');

app.listen(3000);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Home',
        blogs: [
            {title: 'Kosta', snippet: 'Kosta Alabala', body: 'Alabala'},
            {title: 'Marina', snippet: 'Marina Alabala', body: 'Alabala'},
            {title: 'Tedi', snippet: 'Tedi Alabala', body: 'Alabala'},
        ],
    });
});

app.get('/about', function(req, res) {
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

// 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404'
    });
});