import { act, fireEvent, render, screen } from '@testing-library/react';
import List_expenses from '../../../components/list_expenses';

global.fetch = jest.fn();

beforeEach(() => {
    global.fetch.mockClear();
});

const id = '1'

const expense = {
    expense_id: 1,
    expense_name: 'Item',
    value: 1,
    price: 1,
    user_id: 1
}

const user =
{
    expenses: [
        {
            expense_id: 1,
            expense_name: 'Item1',
            value: 1,
            price: 1,
            user_id: 1
        },

        {
            expense_id: 2,
            expense_name: 'Item2',
            value: 1,
            price: 1,
            user_id: 1
        },
        {
            expense_id: 3,
            expense_name: 'Item3',
            value: 1,
            price: 1,
            user_id: 1
        }
    ]
}

const res = {
    ok: true,
    json: async () => {
        return user
    },
    text: async () => { return '' }
}

describe("expenses list test", () => {
    test("should display a list of expenses", async () => {

        global.fetch.mockResolvedValue(res);

        const { getByText } = render(<List_expenses user_id={id} new_expense={expense} />)

        expect(global.fetch).toHaveBeenCalledWith('/api/users?id=' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Add any other necessary headers here
            },
        })

    })
})