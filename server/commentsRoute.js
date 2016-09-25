router.post('/post/:id/comment', function (req, res, next) {
    if (req.isAuthenticated()) {
        blogPost.addComment(req.params.id)
            console.log('router.post req.params.id= ' + req.params.id)
            .then(function (post) {
                res.render('comment', {
                    title: 'Code Stories',
                    link1: '/logout',
                    link1Name: 'log out',
                    link2: '/dashboard',
                    link2Name: 'my dashboard',
                    post: post,
                    owner: req.user.id == post.user_id,
                    user: req.user.id,
                    comment: req.params.id
                });
                console.log('user_id= ' + req.user.id);
            });
    } else {
        res.render('/log_in');
    }
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

router.get('/post/:id/comment/:id/edit', function (req, res, next) {

    if (req.isAuthenticated()) {
        blogPost.getPost(req.params.id)
            .then(function (post) {

                if (!req.user.id == post.user_id) {
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

router.post('/post/:id/comment/:id/edit', function (req, res, next) {
    // Add the user to our data store
    if (req.isAuthenticated()) {
        // instead of add, do update
        blogPost.updatePost({
            id: req.params.id,
            body: req.body.body
        }).then(function () {
            res.redirect('/post/' + req.params.id)
        });
    }
});

router.post('/post/:id/comment/:id/delete', function (req, res, next) {
    // Add the user to our data store
    if (req.isAuthenticated()) {
        // instead of add, do update
        blogPost.getPost(req.params.id)
            .then(function (post) {
                if (post.user_id == req.user.id) {
                    return blogPost.deletePost(post.id);
                }
                else {
                    res.redirect('/error', {message: 'posts can only be deleted by author'});
                    return this;
                }
            }).then(function () {
            res.redirect('/');
        });
    }
});