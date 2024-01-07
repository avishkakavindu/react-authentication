import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
  path: '/api/users/:userId',
  method: 'put',
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;
    const updates = (({ favoriteFood, hairColor, bio }) => ({
      favoriteFood,
      hairColor,
      bio,
    }))(req.body);

    if (!authorization) {
      return res.send(401).json({ message: 'No authorization header' });
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unable to authenticate user' });
      }

      const { _id } = decoded;

      if (_id !== userId) {
        return res
          .status(403)
          .json({ message: 'Not allowed to update user data' });
      }

      const db = getDbConnection('react-auth-db');
      const result = await db
        .collection('users')
        .findOneAndUpdate(
          { _id },
          { $set: { info: updates } },
          { returnOriginal: false }
        );

      const { email, isVerified, info } = result;

      jwt.sign(
        { _id, email, isVerified, info },
        process.env.JWT_SECRET,
        { expiresIn: '2d' },
        (err, token) => {
          if (err) {
            return res.status(200).json({ error: err });
          }
          return res.status(200).json({ token });
        }
      );
    });
  },
};
