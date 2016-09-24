var express = require('express');
var router = express.Router();
var passport = require('../server/passport');
var userModule = require('../server/users');
var blogPost = require('../server/blog_post');
var favicon = require('serve-favicon');

router.get('/', function (req, res, next) {
    //var params = {
    //    title: 'Code Stories',
    //    link1: '/log_in',
    //    link1Name: 'login',
    //    link2: '/sign_up',
    //    link2Name: 'sign up'
    //};
    //blogPost.getPosts()
    //    .then(function (posts) {
    //        // Don't show login and register to logged in users
    //        if (req.isAuthenticated()) {
    //            params.link1 = '/dashboard';
    //            params.link1Name = 'my dashboard';
    //            params.link2 = '/new_post';
    //            params.link2Name = 'create new post';
    //            params.link3 = '/logout';
    //            params.link3Name = 'log out';
    //            params.isUser = 'true';
    //        }
    //        params.posts = posts;
    //        res.render('index', params);
    //    });

    if (req.isAuthenticated()) {
        blogPost.getPosts()
            .then(function (posts) {
                res.render('index', {
                    title: 'Code Stories',
                    link1: '/logout',
                    link1Name: 'log out',
                    link2: '/dashboard',
                    link2Name: 'my dashboard',
                    link3: '/new_post',
                    link3Name: 'create post',
                    posts: posts,
                    user_id: req.user.id
                });
                console.log('index user_id= ' + req.user.id);
            });
    } else {
        blogPost.getPosts()
            .then(function (posts) {
                res.render('index', {
                    title: 'Code Stories',
                    link1: '/log_in',
                    link1Name: 'log in',
                    link2: '/sign_up',
                    link2Name: 'sign up',
                    posts: posts,
                    user_id: false
                });
            });
    }
});

router.get('/post/:id', function (req, res, next) {
    console.log('post_id= ' + req.params.id);


    if (req.isAuthenticated()) {
        blogPost.getPost(req.params.id)
            .then(function (post) {
                res.render('post', {
                    title: 'Code Stories',
                    link1: '/logout',
                    link1Name: 'log out',
                    link2: '/dashboard',
                    link2Name: 'my dashboard',
                    post: post,
                    owner: req.user.id == post.user_id,
                    user: req.user.id
                });
                console.log('user_id= ' + req.user.id);
            });
    } else {
        blogPost.getPost(req.params.id)
            .then(function (post) {
                res.render('post', {
                    title: 'Code Stories',
                    link1: '/log_in',
                    link1Name: 'log in',
                    link2: '/sign_up',
                    link2Name: 'sign up',
                    post: post,
                    id: req.params.id,

                });
            });
    }
});

router.get('/post/:id/edit', function (req, res, next) {
    console.log('post_id= ' + req.params.id);

    if (req.isAuthenticated()) {
        blogPost.getPost(req.params.id)
            .then(function (post) {

                if(!req.user.id == post.user_id){
                    console.log('user ' + req.user.id + 'is not post owner');

                    res.redirect('/');
                    return;
                }
                res.render('edit_post', {
                    title: 'Code Stories',
                    link1: '/logout',
                    link1Name: 'log out',
                    link2: '/dashboard',
                    link2Name: 'my dashboard',
                    post: post,
                });
                console.log('user_id= ' + req.user.id);
            });
    } else {
        // not authenticated
        res.redirect('/');
    }
});

router.post('/post/:id/edit', function (req, res, next) {
    // Add the user to our data store
    if (req.isAuthenticated()) {
        // instead of add, do update
        blogPost.updatePost({
            id: req.params.id,
            body: req.body.body
        }).then(function(){
            res.redirect('/post/' + req.params.id)
        });
    }
});

router.get('/log_in', function (req, res, next) {
    // Don't show login and register to logged in users
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
        return;
    }
    res.render('log_in', {
        title: 'Code Stories',
        link1: '/',
        link1Name: 'home',
        link2: '/sign_up',
        link2Name: 'sign up'
    });
});

// This route will authenticate a user and create a session.
// If successful, req.user will exist,
// redirect to /dashboard,
// and req.isAuthenticated() will return true
router.post('/login', passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/fail'
    })
);


router.get('/sign_up', function (req, res, next) {
    res.render('sign_up', {
        title: 'Code Stories',
        link1: '/',
        link1Name: 'home',
        link2: '/log_in',
        link2Name: 'login'
    });
});

router.post('/sign_up', function (req, res, next) {
    // Add the user to our data store
    userModule.add(req.body.username, req.body.password)
        .then(function () {
            console.log('user registered');
            res.redirect('/log_in');
        })
        .catch(function (err) {
            next(new Error('User could not be created.'));
            return;
        });
});

router.get('/new_post', function (req, res, next) {
    // Don't show login and register to logged in users
    if (!req.isAuthenticated()) {
        res.redirect('/log_in');
        return;
    }
    res.render('new_post', {
        title: 'Code Stories',
        link1: '/',
        link1Name: 'home',
        link2: '/dashboard',
        link2Name: 'my dashboard'
    });
});

router.post('/new_post', function (req, res, next) {
    // Add the user to our data store
    if (req.isAuthenticated()) {
        blogPost.add(req.body.title, req.body.body, req.user.id)
            .then(function () {
                console.log('blog post added');
                res.redirect('/');
            })
            .catch(function (err) {
                next(new Error('blog post could not be created.'));
                return;
            });
    }
});


router.get('/logout', function (req, res) {
    // Clear the session and unauthenticate the user
    req.logout();
    res.redirect('/');
});

router.get('/dashboard', function (req, res, next) {
    // Determine if the user is authenticate to view the page
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }
    // req.user will be the value from deserializeUser
    res.render('dashboard', {
        user: req.user,
        title: 'Code Stories',
        link1: '/new_post',
        link1Name: 'create post',
        link2: '/logout',
        link2Name: 'logout'
    })
});

router.get('/chat', function (req, res, next) {
    res.render('chat', {title: 'Code Stories'});
});

//router.post('/chat', )

module.exports = router;

