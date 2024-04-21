import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../..";
import UserRepository from "../repository/UserRepository";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe('User test case', () => {
    const YOUR_TOKEN: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjQ3NmI2YjU4YjBhMTBiNDMyZmJmZSIsImlhdCI6MTcxMzY2NTcyOCwiZXhwIjoxNzEzNjc2NTI4fQ.yfga8eGgpqOij-Qcy3FS9SpensNkFhDPN5xrlU5cL-Q";
    const hashedPassword: string = "12345";

    describe('User Registration', () => {
        it('should be able to create a new user', async () => {

            const response = await router()
                .post('/api/user/signup')
                .send({
                    username: "pazzo201",
                    email: "aime5@gmail.com",
                    password: hashedPassword
                });
            expect(response).to.have.status(201);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('user');

        });

        it('should return status 400 if user already exists', async () => {

            const response = await router()
                .post('/api/user/signup')
                .send({
                    email: "aime5@gmail.com",
                    password: hashedPassword
                });
            expect(response).to.have.status(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.equal('User already exists');

        });

        it('should return an error status 500 when no data provided', async () => {

            const response = await router()
                .post('/api/user/signup')
                .send();
            expect(response).to.have.status(500);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.equal('Internal server error');

        });
    })

    describe('User Login', () => {
        it('should be able to login', async () => {

            const response = await router()
                .post('/api/user/login')
                .send({
                    email: "aime5@gmail.com",
                    password: hashedPassword
                });
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('user');
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('token');
            expect(response.body.message).to.equal('Login Successful');
            expect(response.body.user).to.be.a('object');

        });

        it('should return status 401 if user uses a wrong email', async () => {

            const response = await router()
                .post('/api/user/login')
                .send({
                    username: "pazzo201",
                    email: "aime@gmail.com",
                    password: hashedPassword
                });
            expect(response).to.have.status(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.equal('Please create an account 🔐');

        });

        it('should return status 401 if user not found', async () => {

            const response = await router()
                .post('/api/user/login')
                .send({
                    email: "aime5@gmail.com",
                    password: '1234'
                });
            expect(response).to.have.status(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.equal('Invalid credentials');

        });
    })

    describe('User Deletion', () => {
        it('should be able to delete user', async () => {


            const id = "user_id";
            const response = await router()
                .delete(`/api/user/delete/${id}`)
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('user');
            expect(response.body.message).to.equal('User deleted successfully');

        });

    })
});
