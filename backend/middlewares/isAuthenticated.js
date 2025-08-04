import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access', success: false });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'fallback-secret-key');
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token', success: false });
        }
        req.id = decoded.UserId; 
        next();  
    } catch (error) {
        console.log('Authentication error:', error);
        return res.status(401).json({ message: 'Invalid or expired token', success: false });
    }
};
export default isAuthenticated;