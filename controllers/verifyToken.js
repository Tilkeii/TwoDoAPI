const jwt = require('jsonwebtoken');

module.exports = server => {
    return encryptedToken => {
        if (!encryptedToken) {
            return Promise.reject({ code: 401, message: 'Unauthorized' });
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
            return Token.findById(token)
                .populate('user')
                .then(token => (token ? token.user : Promise.reject({ code: 401, message: 'Invalid Token' })));
        };

        return decrypt().then(token => {
            console.log(token);
            return token;
        }).then(exists);
    };
};
