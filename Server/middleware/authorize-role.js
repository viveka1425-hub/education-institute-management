
export const authorizeRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = (req).user;

            if (!user || allowedRoles.includes(user.role) === false) {
                throw new Error('You do not have access to this resource');
            }

            next(); // proceed to the next middleware or controller
        } catch (error) {
            console.error(error);
            res.status(403).json({ message: error.message || 'Access forbidden' });
        }
    };
};
