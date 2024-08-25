const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getUsers,
  updateAccessModules,
  removeAccessModule,
  bulkUpdateUsersSameData,
} = require('../controllers/userController');

// Get all Users
router.get('/', authMiddleware, getUsers);

// Update list of accessModules
router.put('/update-access-modules', authMiddleware, updateAccessModules);

// Remove a value from accessModules
router.put('/remove-access-module', authMiddleware, removeAccessModule);

// Bulk update users with same data
router.put('/bulk-update-same-data', authMiddleware, bulkUpdateUsersSameData);


module.exports = router;
