import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'wrong username or password' });
    }
    //valaidate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'invalid credentials' });
    }
    res.status(200).json({ id: user._id, username });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
