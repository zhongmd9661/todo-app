import { Router } from 'express';
import { UserModel } from '../models/User';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    const user = await UserModel.create({
      email,
      username,
      passwordHash: password, // TODO: hash with bcrypt
    });

    res.status(201).json({ user: { id: user.id, email: user.email, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Missing email or password' });
      return;
    }

    const user = await UserModel.findByEmail(email);
    if (!user || user.passwordHash !== password) { // TODO: verify with bcrypt
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    res.json({ user: { id: user.id, email: user.email, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
