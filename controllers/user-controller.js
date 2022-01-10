const { User } = require("../models");

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
    });
  },
  // create user
  createUser(req, res) {
    console.log(req.body);
    User.create(req.body)
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
      res.json({ message: "User deleted" });
    });
  },

  addFriend: ({ params }, res) => {
    console.log(params);
    // User.create()
    User.findOneAndUpdate(
      { _id: params.userId },
      {
        $push: { friends: params.friendId }, // we did a destructuring here
      },
      { new: true }
    ) // this is to confirm that we are getting the updated user
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend: ({ params }, res) => {
    User.findOneAndUpdate(
      { _id: params.userId },
      {
        $pull: { friends: params.friendId },
      },
      (err, user) => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Friend deleted" });
      }
    );
  },
};

module.exports = allUsersController;
