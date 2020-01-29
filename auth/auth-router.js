const router = require('express').Router();
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secret');
const userModel = require('../user/model');

