const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../src/app');
const Student = require('../../src/models/student');

// axios, fetch
const request = supertest(app);

describe('/students', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST', () => {
    beforeEach(async () => {
      await Student.deleteMany({}).exec();
    });
    it('should save the student if request is valid', async () => {
      const body = {
        firstName: 'xx',
        lastName: 'yy',
        email: 'abc@example.com',
      };
      // try {

      // } catch () {

      // }
      const res = await request.post('/v1/students').send(body);

      expect(res.statusCode).toBe(201);
      const student = await Student.findOne(body).exec();
      expect(student).toBeDefined();
    });
  });

  describe('GET', () => {
    beforeEach(async () => {
      await Student.deleteMany({}).exec();
    });

    it('should return all student data', async () => {
      const students = [
        {
          firstName: 'xx',
          lastName: 'yy',
          email: 'abc@eexample.com',
        },
        {
          firstName: 'xx',
          lastName: 'yy',
          email: 'abc@eexample.com',
        },
      ];
      await Student.insertMany(students);

      const res = await request.get('/v1/students');

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });
});

function foo() {
  throw new Error('');
}

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

expect(obj).toEqual(expect.objectContaining({ a: 1 }));
// toBe (primitive type)
// toEqual (object)
// toBeTruthy (true)
// toMatch (regex)
// toThrow
// toContain (check element exist in array)
// objectContaining
