const User = require('../models/User');
const Role = require('../models/Role');

// Get all users with roleName and accessModules populated
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role', 'roleName accessModules');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update list of accessModules
exports.updateAccessModules = async (req, res) => {
  try {
    const { userId, accessModules } = req.body;
    const user = await User.findById(userId).populate('role');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update accessModules ensuring uniqueness
    const newAccessModules = [...new Set([...user.role.accessModules, ...accessModules])];
    user.role.accessModules = newAccessModules;
    await user.role.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a value from accessModules
exports.removeAccessModule = async (req, res) => {
  try {
    const { userId, moduleToRemove } = req.body;
    const user = await User.findById(userId).populate('role');
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role.accessModules = user.role.accessModules.filter(
      (mod) => mod !== moduleToRemove
    );
    await user.role.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update multiple users with same data
exports.bulkUpdateUsersSameData = async (req, res) => {
  try {
    const { usersIds, updateData } = req.body;
    const result = await User.updateMany({ _id: { $in: usersIds } }, updateData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
  
