import jwt from 'jsonwebtoken';

export async function authorizeToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Authorization header missing or invalid');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        console.log('Decoded:', decoded);

        // Attach user to request
        req.user = decoded;

        next(); // Proceed to next middleware or route
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: err.message ?? 'Invalid or expired token' });
    }
}
