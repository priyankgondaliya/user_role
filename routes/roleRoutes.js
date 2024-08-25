const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');

// Create Role
router.post('/', authMiddleware, createRole);

// Get all Roles
router.get('/', authMiddleware, getRoles);

// Get Role by ID
router.get('/:id', authMiddleware, getRoleById);

// Update Role
router.put('/:id', authMiddleware, updateRole);

// Delete Role
router.delete('/:id', authMiddleware, deleteRole);

module.exports = router;
