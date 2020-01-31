const router = require('express').Router();
const UserModel = require('./model');

router.get('/', (req, res) => {
    UserModel.find()
    .then(users => {
        res.json({ users, LoggedInUser: req.user.username })
    })
    .catch(error => {
        res.send(error)
    })
})

module.exports = router;