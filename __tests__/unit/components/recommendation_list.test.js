import { act, fireEvent, render, screen } from '@testing-library/react';
import Recommendation_list from '../../../components/recommendation_list';

global.fetch = jest.fn();

beforeEach(() => {
    global.fetch.mockClear();
});


const expenses = [
    {
        expense_id: 1,
        expense_name: 'Item1',
        value: 5,
        price: 3,
        user_id: 1
    },

    {
        expense_id: 2,
        expense_name: 'Item2',
        value: 4,
        price: 4,
        user_id: 1
    },
    {
        expense_id: 4,
        expense_name: 'Item4',
        value: 4,
        price: 3,
        user_id: 1
    },
    {
        expense_id: 5,
        expense_name: 'Item5',
        value: 7,
        price: 4,
        user_id: 1
    }
    ,
    {
        expense_id: 6,
        expense_name: 'Item6',
        value: 6,
        price: 5,
        user_id: 1
    }
    ,
    {
        expense_id: 7,
        expense_name: 'Item7',
        value: 9,
        price: 6,
        user_id: 1
    }
    ,
    {
        expense_id: 8,
        expense_name: 'Item8',
        value: 8,
        price: 7,
        user_id: 1
    }
    ,
    {
        expense_id: 9,
        expense_name: 'Item9',
        value: 5,
        price: 8,
        user_id: 1
    }
    ,
    {
        expense_id: 10,
        expense_name: 'Item10',
        value: 9,
        price: 9,
        user_id: 1
    }
    ,
    {
        expense_id: 11,
        expense_name: 'Item11',
        value: 9,
        price: 10,
        user_id: 1
    }
]

const budget = 15

const result = {
    max_value: 22, result: [
        {
            expense_id: 6,
            expense_name: 'Item6',
            value: 6,
            price: 5,
            user_id: 1
        },
        {
            expense_id: 5,
            expense_name: 'Item5',
            value: 7,
            price: 4,
            user_id: 1
        },

        {
            expense_id: 4,
            expense_name: 'Item4',
            value: 4,
            price: 3,
            user_id: 1
        },
        {
            expense_id: 1,
            expense_name: 'Item1',
            value: 5,
            price: 3,
            user_id: 1
        }

    ]
}

const res = {
    ok: true,
    json: async () => {
        return result
    },
    text: async () => { return '' }
}

describe('recommendaton_list test', () => {
    test('should display a form with budget as input', async () => {

        await act(() => {
            render(<Recommendation_list expenses={expenses} />)
        })

        const budget_input = screen.getByLabelText(/budget:/i);
        const budget_button = screen.getByText('submit')

        expect(budget_input).toBeInTheDocument()
        expect(budget_button).toBeInTheDocument()
    })


    test('should call api/recommendation when form submit', async () => {

        await act(() => {
            render(<Recommendation_list expenses={expenses} />)
        })

        const budget_input = screen.getByLabelText(/budget:/i);
        const budget_button = screen.getByText('submit')

        global.fetch.mockResolvedValue(res)

        await act(() => {
            fireEvent.change(budget_input, { target: { value: 15 } })
            fireEvent.click(budget_button)
        })

        expect(global.fetch).toHaveBeenCalledWith('/api/recommendation?budget=' + budget, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Add any other necessary headers here
            },
            body: JSON.stringify(expenses)
        })
    })

})