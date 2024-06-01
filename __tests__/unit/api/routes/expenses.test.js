import { create_expense, delete_expense } from '../../../../pages/api/services/expenses.service'
import handler from '../../../../pages/api/routes/expenses'
import { custum_error } from "../../../../pages/api/services/custum_error";

describe('api/routes/expenses test', () => {

    test('api/routes/expenses with Post method should call create_expenses of expenses.service with valid parameter and send the new expense created back with http code 200.', async () => {

        const expense = {
            expense_id: '1',
            expense_name: 'stuff',
            value: 10,
            price: 1000,
            user_id: '1'
        }

        const req = { method: 'POST', body: expense };
        const res = { status: jest.fn(), json: jest.fn() };

        create_expense.mockResolvedValue(expense);

        handler(req, res).then((data) => {
            expect(create_expense).toHaveBeenCalledWith(expense);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expense);
        })

    })



    test('api/routes/expenses with Post method should call create_expenses of expenses.service with nex expense that have inexisting user_id parameter and throw User not found with http code 404.', async () => {

        const expense = {
            expense_id: '1',
            expense_name: 'stuff',
            value: 10,
            price: 1000,
            user_id: '1'
        }

        const req = { method: 'POST', body: expense };
        const res = { status: jest.fn(), json: jest.fn(), set: jest.fn() };

        create_expense.mockImplementation(async () => {
            throw custum_error('User not found!', 404)
        });

        handler(req, res).then((data) => {
            expect(create_expense).toHaveBeenCalledWith(expense);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.set).toHaveBeenCalledWith('User not found!');
        })

    })



    test('api/routes/expenses/${expense_id} with Delete method should call delete_expense of expenses.service with exisiting expense_id and send message expense deleted with http code 200.', async () => {

        const expense_id = '1';

        const req = { method: 'DELETE', url: 'http://localhost:3000/api/routes/expenses?expense_id=1' };
        const res = { status: jest.fn(), json: jest.fn(), set: jest.fn() };

        delete_expense.mockImplementation(async () => { });

        handler(req, res).then((data) => {
            expect(delete_expense).toHaveBeenCalledWith(expense_id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.set).toHaveBeenCalledWith('Expense deleted successfully!');
        })

    })

    test('api/routes/expenses/${expense_id} with Delete method should call delete_expense of expenses.service with inexisiting expense_id and throw expense not found with http code 404.', async () => {

        const expense_id = '1';

        const req = { method: 'DELETE', url: 'http://localhost:3000/api/routes/expenses?expense_id=1' };
        const res = { status: jest.fn(), json: jest.fn(), set: jest.fn() };

        delete_expense.mockImplementation(async () => {
            throw custum_error('Expense not found!', 404);
        });

        handler(req, res).then((data) => {
            expect(delete_expense).toHaveBeenCalledWith(expense_id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.set).toHaveBeenCalledWith('Expense not found!');
        })

    })

})