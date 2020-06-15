const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js');

const Users = require('../users/users-model.js');

function genToken(user) {
	const payload = {
		userid: user.id,
		username: user.username,
		department: user.department,
	};

	const options = { expiresIn: '1h' };
	const token = jwt.sign(payload, secret.jwtSecret, options);

	return token;
}

router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	Users.addUser(user)
		.then((saved) => {
			const token = genToken(saved);
			res.status(201).json({ created_user: saved, token: token });
		})
		.catch((error) => {
			console.log(error);
			res
				.status(500)
				.json({
					errorMessage: `Username: '${user.username}' is already registered`,
				});
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = genToken(user);
				res
					.status(200)
					.json({ message: `Welcome ${user.username}!`, token: token });
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

module.exports = router;
