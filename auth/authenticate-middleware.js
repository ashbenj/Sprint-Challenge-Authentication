/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js');

function restrict() {
	const authError = {
		message: 'Invalid credentials',
	};

	return async (req, res, next) => {
		try {
			const token = req.headers.authorization;
			if (!token) {
				return res.status(401).json(authError);
			}
			jwt.verify(token, secret.jwtSecret, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError);
				}
				req.token = decoded;
				console.log('decoded', decoded);
				next();
			});
		} catch (err) {
			next(err);
		}
	};
}

module.exports = restrict;
