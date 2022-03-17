const db = require("../models");
const Users = db.users;
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const fs = require('fs');