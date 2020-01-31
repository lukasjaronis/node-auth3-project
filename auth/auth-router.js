const router = require("express").Router();
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const UserModel = require("../user/model");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bc.hashSync(user.password, 12);
  
  user.password = hash;
  UserModel.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  UserModel.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ errorMessage: "Invalid Username or Password" });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: `There was an error. ${error}` });
    });
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
