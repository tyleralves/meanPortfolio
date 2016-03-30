var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Image = mongoose.model('Image');
var Post = mongoose.model('Post');
var Project = mongoose.model('Project');

/* GET home page. */
router.get('/', function(req, res, next) {
    var testPost = {
      title: 'TestPost',
      content: 'Test Content, blah, blah, blah, blah, blah.'
    };
    Post.create(testPost, function(err,post){
        res.render('main.ejs', { post: post });
    });
});

module.exports = router;
