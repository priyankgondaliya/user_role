const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    console.log(req.body)
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ error: "This user is already registered." });
      }

    let user = new User({ firstName, lastName, email, password, role });
    console.log(user,"user")
    await user.save();
    res.status(201).json({ message: 'User registered successfully',data:user});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('role');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
