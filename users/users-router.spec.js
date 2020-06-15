const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

const Users = require('../users/users-model.js');

describe('users-router.js ', () => {
	it('Should return 401 w/o jwt', async () => {
		const response = await request(server).get('/api/users');
		expect(response.status).toBe(401);
	});

	it('Expected Application/JSON', () => {
		return request(server)
			.get('/api/users')
			.expect('Content-Type', 'application/json; charset=utf-8');
	});
});
