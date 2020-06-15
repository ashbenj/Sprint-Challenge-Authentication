const request = require('supertest');

const server = require('./server.js');
const db = require('../database/dbConfig.js');

describe('API test', () => {
	it('test API w/o errors', () => {
		expect(true).toBeTruthy();
	});
});

describe('Test server.js', () => {
	describe('/endpoint', () => {
		it('Return a 200', async () => {
			const response = await request(server).get('/');
			expect(response.status).toBe(200);
		});
		it('Should return a string of expected response', async () => {
			const expected = 'It works';
			const response = await request(server).get('/');
			expect(response.text).toMatch(expected);
		});
	});
});
