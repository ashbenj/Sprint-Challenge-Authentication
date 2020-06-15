const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

const Users = require('../users/users-model.js');

describe('API test', () => {
	it('test API w/o errors', () => {
		expect(true).toBeTruthy();
	});
});

describe('auth-router.js', () => {
	describe('/register endpoint', () => {
		beforeEach(async () => {
			await db('users').truncate();
		});

		const userInfo = { username: 'ashbenj', password: 'password3' };

		it('Should return a 201', () => {
			let response;
			return request(server)
				.post('/api/auth/register')
				.send(userInfo)
				.then((res) => {
					response = res;
					expect(response.status).toBe(201);
				});
		});

		it('Should return login message', () => {
			const message = 'Register Successful';

			let response;
			return request(server)
				.post('/api/auth/register')
				.send(userInfo)
				.then((res) => {
					response = res;
					expect(response.body.message).toMatch(message);
				});
		});
	});

	describe('/login endpoint', () => {
		// beforeEach(async () => {
		//     await db("users").truncate();
		// })

		const userInfo = { username: 'ashbenj', password: 'password3' };

		it('Should return a 200', () => {
			let response;
			return request(server)
				.post('/api/auth/login')
				.send(userInfo)
				.then((res) => {
					response = res;
					expect(response.status).toBe(200);
				});
		});

		it('Should return login message', () => {
			const message = 'Welcome ashbenj';

			let response;
			return request(server)
				.post('/api/auth/login')
				.send(userInfo)
				.then((res) => {
					response = res;
					expect(response.body.message).toMatch(message);
				});
		});
	});
});
