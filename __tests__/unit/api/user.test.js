import { get_user_by_id, delete_user } from '../../../services/users.service'
import handler from '../../../pages/api/users'
import { custum_error } from "../../../services/custum_error";

describe('api/routes/users test', () => {
    test('api/routes/users/${id} with GET method should call get_user_by_id of users.service with existing id and send the user back wihtout exposing the password of the user with http code 200.', () => {

        const user = {
            id: "1",
            name: 'Lucky',
            email: 'lucky@gmail.com',
        }

        const req = { method: 'GET', url: 'http://localhost:3000/api/routes/users?id=1' };
        const res = { status: jest.fn(), json: jest.fn() };
        const send = { send: jest.fn() }

        res.status.mockImplementation(() => {
            return send;
        })

        get_user_by_id.mockResolvedValue(user)

        handler(req, res).then((data) => {
            expect(get_user_by_id).toHaveBeenCalledWith(user.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                id: "1",
                name: 'Lucky',
                email: 'lucky@gmail.com',
            });
        })

    })


    test('api/routes/users/${id} with GET method should call get_user_by_id of users.service with inexisting id and throw User not found! with http code 404', () => {

        const id = "1"

        const req = { method: 'GET', url: 'http://localhost:3000/api/routes/users?id=1' };
        const res = { status: jest.fn(), json: jest.fn() };
        const send = { send: jest.fn() }

        res.status.mockImplementation(() => {
            return send;
        })

        get_user_by_id.mockImplementation(async () => {
            throw custum_error('User not found!', 404)
        })

        handler(req, res).then((data) => {
            expect(get_user_by_id).toHaveBeenCalledWith(id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(send.send).toHaveBeenCalledWith('User not found!');
        })

    })

    test('api/routes/users/${id} with DELETE method should call delete_user of users.service with existing id and send a 200 code', () => {

        const id = "1"

        const req = { method: 'DELETE', url: 'http://localhost:3000/api/routes/users?id=1' };
        const res = { status: jest.fn(), json: jest.fn() };
        const send = { send: jest.fn() }

        res.status.mockImplementation(() => {
            return send;
        })

        delete_user.mockImplementation(async () => {
        })

        handler(req, res).then(() => {
            expect(delete_user).toHaveBeenCalledWith(id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(send.send).toHaveBeenCalledWith('User deleted successfully!');
        })

    })


    test('api/routes/users/${id} with DELETE method should call delete_user of users.service with inexisting id, throw user not found! and send a 404 code', () => {

        const id = "1"

        const req = { method: 'DELETE', url: 'http://localhost:3000/api/routes/users?id=1' };
        const res = { status: jest.fn(), json: jest.fn() };
        const send = { send: jest.fn() }

        res.status.mockImplementation(() => {
            return send;
        })

        delete_user.mockImplementation(async () => {
            throw custum_error('User not found!', 404)
        })

        handler(req, res).then(() => {
            expect(delete_user).toHaveBeenCalledWith(id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(send.send).toHaveBeenCalledWith('User not found!');
        })

    })


})