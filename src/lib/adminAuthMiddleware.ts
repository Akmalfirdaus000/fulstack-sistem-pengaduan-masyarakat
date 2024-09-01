import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

const adminAuthMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token tidak ditemukan.' });
    }

    try {
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; role: string };
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Akses terlarang.' });
      }
      (req as any).user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error('Error dalam middleware:', error);
      return res.status(401).json({ message: 'Token tidak valid atau telah kadaluarsa.' });
    }
  };
};

export default adminAuthMiddleware;
