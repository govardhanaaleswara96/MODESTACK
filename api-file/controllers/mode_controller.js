const User = require("../models/register");
const Article = require("../models/article");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user
const registerUser = async (req, res, next) => {
  //console.log(req.body);
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  // console.log(hashPassword);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    address: req.body.address,
  });
  user
    .save()
    .then((result) => {
      res.json({
        statusCode: 201,
        body: {
          message: "new user created !",
        },
      });
    })
    .catch((err) => {
      res.status(404).json({
        statusCode: 404,
        body: {
          message: "User Register Failed !",
        },
      });
    });
};
//  login function
const loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req.body);
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.status(404).json({
        statusCode: 404,
        body: {
          message: "User Not Found !",
        },
      });
    } else {
      // console.log(user);
      bcrypt.compare(password, user.password, (err, data) => {
        if (data) {
          const token = jwt.sign({ user }, "h4d5fe5");
          console.log(token);
          res.json({
            statusCode: 201,
            body: {
              message: "User Login Successfully",
              accessToken: token,
            },
          });
        } else {
          res.status(404).json({
            statusCode: 404,
            body: {
              message: "Invalid Credentials",
            },
          });
        }
      });
    }
  });
};
// create article
const createArticle = (req, res, next) => {
  const article = new Article({
    username: req.body.username,
    title: req.body.title,
    body: req.body.body,
  });
  article
    .save()
    .then((result) => {
      res.json({
        statusCode: 201,
        body: {
          message: "new article created !",
        },
      });
    })
    .catch((err) => {
      res.status(404).json({
        statusCode: 404,
        body: {
          message: "article created Failed !",
        },
      });
    });
};
const getArticles = (req, res, next) => {
  Article.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  registerUser,
  createArticle,
  getArticles,
  loginUser,
};
