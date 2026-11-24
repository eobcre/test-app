import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // check signature, expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if (typeof decoded !== 'object' || typeof decoded.sub !== 'string') {
    //   res.status(401).json({ message: 'Invalid token.' });
    // }

    req.userId = decoded.sub;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
