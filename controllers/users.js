var User = require('../models/user');
var express = require('express');
var router = express.Router();


// GET /users
// Get a list of users
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    res.json(users);
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});

// CREATE users

router.post('/', function (res, req, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.status(200).json(post);
  });
});

// Find User to Delete by id
router.delete('/:id', function (res, req) {
  User.finduserToDelete({ _id: req.params.id }, function (err, user){

    if (!user) {
      return res.status(404).end();
    }

    if (err) {
      return res.status(500).json({
                                    error: 'check that user exists ' + err,
                                  });
    }
    res.status(300).json({ message: `user deleted ${req.params.id}` });
  });
});

module.exports = router;
