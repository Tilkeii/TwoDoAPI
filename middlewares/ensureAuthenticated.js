const jwt = require('jsonwebtoken');
const ModelIndex = require('../models');
const User = ModelIndex.User;

const ensureAuthenticated = (req, res, next) => {
        if ((req.url === '/' || req.url === '/login') && req.method === 'POST') {
            return next();
        }

        const encryptedToken = req.header('authorization');

        if (!encryptedToken) {
            return res.status(401).json({ code: 401, message: 'Unauthorized' });
        }

        const decrypt = () => {
            return new Promise((resolve, reject) => {
                jwt.verify(
                    encryptedToken,
                    'secretkey',
                    (err, decryptedToken) => (err ? reject(err) : resolve(decryptedToken))
                );
            });
        };

        const exists = token => {
            const user = token.user;

            if (!user) {
                return Promise.reject({ code: 401, message: 'Invalid Token' });
            }

            return User.find({
                where: {
                  id: user.id
                }
            });
        };

        decrypt()
            .then(exists)
            .then(user => (res.locals.user = user))
            .then(() => next())
            .catch(err => res.status(err.code || 500).json({ error: err.message || err }));
};

module.exports = ensureAuthenticated;
