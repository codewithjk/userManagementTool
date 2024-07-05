const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getUsers = async (req, res) => {
  // add skip limit for pagination
  console.log(req.query);
  let currentPage = req.query.page;
  let query = req.query.search;
  let limit = 5;
  let skip = limit * (currentPage - 1);

  let filter = {};
  if (query.length > 0) {
    filter = {
      name: {
        $regex: query,
        $options: "i",
      },
    };
  }
  const users = await User.find(filter).skip(skip).limit(limit);

  console.log(users);
  const totalUsers = await User.countDocuments(filter);
  const total = Math.ceil(totalUsers / limit);

  res.json({ users, total });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(401).json({ message: "User already exists" });
      // throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin: isAdmin || false,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  const image = req.file
    ? `http://localhost:8080/uploads/${req.file.filename}`
    : null;
  console.log(req.body);

  console.log(req.file);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.profileImage = image || user.profileImage;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      profileImage: updatedUser.profileImage,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const deleteUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await User.deleteOne({ _id: req.params.id });
      res.json({ message: "User removed", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};
