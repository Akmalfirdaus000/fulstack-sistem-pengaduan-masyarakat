import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findByPk(id);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user', error: (error as Error).message });
      }
      break;

    case 'PUT':
      try {
        const user = await User.findByPk(id);
        if (user) {
          const updatedUser = await user.update(req.body);
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: (error as Error).message });
      }
      break;

    case 'DELETE':
      try {
        const user = await User.findByPk(id);
        if (user) {
          await user.destroy();
          res.status(200).json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: (error as Error).message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

export default handler;
