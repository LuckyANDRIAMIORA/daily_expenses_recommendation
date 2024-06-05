import { act, fireEvent, render, screen } from '@testing-library/react';
import Expenses_form from '../../../components/expenses_form';

jest.mock('../../../components/list_expenses', () => () => <mock-modal data-testid="modal" />)

global.fetch = jest.fn();

beforeEach(() => {
    global.fetch.mockClear();
    jest.resetAllMocks();
});

afterEach(() => {
    global.fetch.mockClear();
    jest.resetAllMocks();
});

describe("expenses_list test", () => {
    test("should display expense form with expense_name, value, and price as input and an add button", () => {
        const id = '1'
        const { getByLabelText, getByText } = render(<Expenses_form id={id} />)
        const expense_name = getByLabelText('expense')
        const value = getByLabelText('value')
        const price = getByLabelText('price')
        const add_button = getByText('add')

        expect(expense_name).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(add_button).toBeInTheDocument()

    })

    test("should call fetch with expense_name, value, price and user_id as params", async () => {

        const id = '1'
        const { getByLabelText, getByText } = render(<Expenses_form id={id} />)
        const expense_name = getByLabelText('expense')
        const value = getByLabelText('value')
        const price = getByLabelText('price')
        const add_button = getByText('add')

        const res = {
            ok: true,
            json: async () => {
                return [{
                    expense_id: 1,
                    expense_name: 'stuff',
                    value: 1,
                    price: 1,
                    user_id: '1'
                }]
            },
            text: async () => { return '' }
        }

        global.fetch.mockResolvedValue(res);

        act(() => {
            fireEvent.change(expense_name, { target: { value: 'stuff' } });
            fireEvent.change(value, { target: { value: 1 } });
            fireEvent.change(price, { target: { value: 1 } });
            fireEvent.click(add_button)
            expect(global.fetch).toHaveBeenCalledWith('/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Add any other necessary headers here
                },
                body: JSON.stringify({
                    expense_name: 'stuff',
                    value: '1',
                    price: '1',
                    user_id: id
                })
            })
        })
    })

})