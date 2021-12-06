const { User } = require('../models/user');

const allUsersController = {
    // get all users
    getAllUsers: (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    },
    // get user by id
    getUserById: (req, res) => {
        User.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        }
      );
    },
    // create user 
    createUser({ body }, res) {
        User.create(body)
          .then((user) => res.json(user))
          .catch((err) => res.status(400).json(err));
      },


    // update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then((user) => {
            if (!user) {
              res.status(404).json({ message: "No users found with this id!" });
              return;
            }
            res.json(user);
          })
          .catch((err) => res.status(400).json(err));
    },


    // delete user
    deleteUser: (req, res) => {
        User.remove({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User deleted' });
        });
    },
};

module.exports = allUsersController;