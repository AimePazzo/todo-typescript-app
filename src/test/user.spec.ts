import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from '../index';
chai.use(chaiHttp);
const router = () => chai.request(app);

describe('User test case', () => {
    it('should be able to create a new user', async () => {
        router()
            .post('/api/auth/signup')
            .send({
                username: 'test',
                email: 'test@example.com',
                password: 'testpassword'
            }).then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.key('message');
                expect(res.body.message).to.equal('User registered successfully');
                expect(res.body).to.have.key('data');
                expect(res.body.data.user).to.have.key('username');
                expect(res.body.data.user).to.have.key('email');
            }).catch(err => {
                throw new Error(err)
            });
    });

    it('should return status 400 if user already exists', async () => {
        router()
            .post('/api/auth/signup')
            .send({
                username: 'test',
                email: 'test1@example.com',
                password: 'testpassword'
            }).then(( res) => {
                expect(res).to.have.status(400); 
                expect(res.body).to.have.key('message');
                expect(res.body.message).to.equal('Email already exists');
            }).catch(( err) => {
                console.error(err);
            })
    });
});

