import { create_user, get_user_by_user_id, delete_user, update_user} from '../../../../pages/api/services/users.service'
import handler from '../../../../pages/api/routes/users'
import { custum_error } from "../../../../pages/api/services/custum_error";

describe('api/routes/users test', () => {
    test('api/routes/users with Post method should call create_user of users.service with valid parameter and send the new user created back with http code 200.', () => {

        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        const req = { method: 'POST', body: user };
        const res = { status: jest.fn(), json: jest.fn() };

        create_user.mockResolvedValue(user)

        handler(req, res).then((data) => {
            expect(create_user).toHaveBeenCalledWith(user);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);
        })

    })


    test('api/routes/users with Post method should call create_user of users.service with user that has email already in use and send error message Email already in use! with code 409.', () => {

        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        const req = { method: 'POST', body: user };
        const res = { status: jest.fn(), json: jest.fn(), set: jest.fn() };

        create_user.mockImplementation(async (user) => {
            throw custum_error('Email already in use!', 409)
        })

        handler(req, res).then(() => {
            expect(create_user).toHaveBeenCalledWith(user);
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.set).toHaveBeenCalledWith('Email already in use!');
        })

    })


    test('api/routes/users/${user_id} with GET method should call get_user_by_user_id of users.service with existing user_id and send the user back wihtout exposing the password of the user with http code 200.', () => {

        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        const req = { method: 'GET', url: 'http://localhost:3000/api/routes/users?user_id=1' };
        const res = { status: jest.fn(), json: jest.fn() };

        get_user_by_user_id.mockResolvedValue(user)

        handler(req, res).then((data) => {
            expect(get_user_by_user_id).toHaveBeenCalledWith(user.user_id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                user_id: "1",
                user_email: 'lucky@gmail.com',
                user_name: 'Lucky',
                user_password: ''
            });
        })

    })


    test('api/routes/users/${user_id} with GET method should call get_user_by_user_id of users.service with inexisting user_id and throw User not found! with http code 404', () => {

        const user_id = "1"

        const req = { method: 'GET', url: 'http://localhost:3000/api/routes/users?user_id=1' };
        const res = { status: jest.fn(), json: jest.fn(), set: jest.fn() };

        get_user_by_user_id.mockImplementation(async () => {
            throw custum_error('User not found!', 404)
        })

        handler(req, res).then((data) => {
            expect(get_user_by_user_id).toHaveBeenCalledWith(user_id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.set).toHaveBeenCalledWith('User not found!');
        })

    })

    test('api/routes/users/${user_id} with DELETE method should call delete_user of users.service with existing user_id and send a 200 code', () => {

        const user_id = "1"

        const req = { method: 'DELETE', url: 'http://localhost:3000/api/routes/users?user_id=1' };
        const res = { status: jest.fn(), json: jest.fn(), set: jest.fn() };

        delete_user.mockImplementation(async () => {
        })

        handler(req, res).then(() => {
            expect(delete_user).toHaveBeenCalledWith(user_id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.set).toHaveBeenCalledWith('User deleted successfully!');
        })

    })


    test('api/routes/users/${user_id} with DELETE method should call delete_user of users.service with inexisting user_id, throw user not found! and send a 404 code', () => {

        const user_id = "1"

        const req = { method: 'DELETE', url: 'http://localhost:3000/api/routes/users?user_id=1' };
        const res = { status: jest.fn(), json: jest.fn(), set: jest.fn() };

        delete_user.mockImplementation(async () => {
            throw custum_error('User not found!',404)
        })

        handler(req, res).then(() => {
            expect(delete_user).toHaveBeenCalledWith(user_id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.set).toHaveBeenCalledWith('User not found!');
        })

    })



    test('api/routes/users with PUT method should call update_user of users.service with valid parameter and send the user updated back with http code 200.', () => {

        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        const req = { method: 'PUT', body: user };
        const res = { status: jest.fn(), json: jest.fn() };

        update_user.mockResolvedValue(user)

        handler(req, res).then((data) => {
            expect(update_user).toHaveBeenCalledWith(user);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);
        })

    })


    test('api/routes/users with PUT method should call update_user of users.service with user that has email already in use and send error message Email already in use! with code 409.', () => {

        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        const req = { method: 'PUT', body: user };
        const res = { status: jest.fn(), json: jest.fn(), set: jest.fn() };

        update_user.mockImplementation(async()=>{
            throw custum_error('Email already in use!', 409)
        })

        handler(req, res).then((data) => {
            expect(update_user).toHaveBeenCalledWith(user);
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.set).toHaveBeenCalledWith('Email already in use!');
        })

    })

})