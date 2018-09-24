var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', game_controller.index);

module.exports = router;
