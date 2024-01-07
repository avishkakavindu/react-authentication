import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const loginRoute = {
  path: '/api/login',
  method: 'post',
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = getDbConnection('react-auth-db');

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      res.sendStatus(401);
    }

    const { _id, isVerified, passwordHash, info } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      jwt.sign(
        { _id, isVerified, email, info },
        process.env.JWT_SECRET,
        { expiresIn: '2d' },
        (err, token) => {
          if (err) {
            res.status(500).json({ error: err });
          }
          res.status(200).json({ token });
        }
      );
    }
    return res.sendStatus(401);
  },
};
