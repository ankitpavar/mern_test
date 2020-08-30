const User = require('../models/user');

// For Create User
exports.createUser = (req, res) => {
  //validation for creating user
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.dob ||
    !req.body.bio
  ) {
    return res.status(400).send({
      message: 'Required field can not be empty',
    });
  }

  //Create a user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob,
    bio: req.body.bio,
  });

  // Save user to database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while saving user',
      });
    });
};

// For getting all users

exports.getAllUsers = (req, res) => {
  User.find()
    .sort({ firstName: -1 })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while getting users',
      });
    });
};

//For getting One User
exports.getUser = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: 'User not found with id ' + req.params.id,
      });
    }
    res.status(200).send(user);
  })
  .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.id,
      });
    });
};

// For updating a user 
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'no user found',
          });
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        return res.status(404).send({
          message: 'error while updating the post',
        });
      });
}
// For deleting a user 

exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found ',
          });
        }
        res.send({ message: 'User deleted successfully!' });
      })
      .catch((err) => {
        return res.status(500).send({
          message: 'Could not delete user ',
        });
      });
}
