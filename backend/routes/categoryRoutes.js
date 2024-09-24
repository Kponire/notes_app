const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken } = require('../middleware/authMiddleware')

router.post('/', verifyToken, categoryController.createCategory);
router.get('/', verifyToken, categoryController.getCategories);
router.put('/', verifyToken, categoryController.updateCategory);

module.exports = router;
