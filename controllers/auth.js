const jwt = require('jsonwebtoken');
const sha1 = require('sha1');

module.exports = server => {
    const Token = server.models.Token;
    const User = server.models.User;

    const ensureLimitNotExceeded = user => {
        const ensureCountNotExceeded = tokens => {
            console.log(tokens);
            console.log('tokens.length: ' + tokens.length);
            console.log('limit: ' + process.env.SIMULTANEOUS_LOGIN_LIMIT);

            if (tokens.length < process.env.SIMULTANEOUS_LOGIN_LIMIT) {
                return true;
            }

            return Token.findByIdAndRemove(tokens[0].id);
        };

        const create = () => {
            return Token.create({ user: user.id });
        };

        return Token.find()
            .where({ user: user.id })
            .sort('created_at')
            .then(ensureCountNotExceeded)
            .then(create);
    };

    const encrypt = token => {
        return new Promise((resolve, reject) => {
            jwt.sign(
                token.id,
                process.env.SECRET,
                (err, encryptedToken) => (err ? reject(err) : resolve(encryptedToken))
            );
        });
    };

    const checkUser = user => {
        if (user === null) {
            return Promise.reject({ code: 'bad_credentials', status: 401, message: 'Bad Credentials' });
        }

        if (!user.activated) {
            return Promise.reject({
                code: 'activation_required',
                status: 401,
                message: 'Please activate your account before login',
            });
        }

        return user;
    };

    return (req, res) => {
        let user;

        User.findOne()
            .where({
                email: req.body.email,
                password: sha1(req.body.password),
            })
            .populate('class')
            .deepPopulate(['class.year', 'class.group', 'class.speciality', 'class.topics'])
            .then(checkUser)
            .then(u => (user = u))
            .then(ensureLimitNotExceeded)
            .then(encrypt)
            .then(encryptedToken => res.json({ token: encryptedToken, user: user }))
            .catch(err => res.status(err.status || 500).json({ error: err.message || err, code: err.code || '' }));
    };
};
