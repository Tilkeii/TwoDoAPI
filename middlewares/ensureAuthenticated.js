module.exports = server => {
    return (req, res, next) => {
        if ((req.url === '/user/login' || req.url === '/user/') && req.method === 'POST') {
            return next();
        }

        const encryptedToken = req.header('authorization');
        server.controllers.auth
            .verifyToken(encryptedToken)
            .then(user => (res.locals.user = user))
            .then(() => next())
            .catch(err => res.status(err.code || 500).json({ error: err.message || err }));
    };
};
