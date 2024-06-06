import { recommendation } from "../../../services/recommendation.service";
import handler from "../../../pages/api/recommendation";
import { custum_error } from "../../../services/custum_error";

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

describe('recommendation test', () => {
    test('should call recommendation service with the right prameters and send the result with status 200.', async () => {
        const budget = 15
        const req = { method: 'POST', query: {budget:budget}, body: expenses };
        const res = { status: jest.fn(), json: jest.fn() };
        const send = { send: jest.fn() }

        res.status.mockImplementation(() => {
            return send;
        })

        recommendation.mockResolvedValue({max_value:22, result:[
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

        ]})

        handler(req, res).then((data)=>{
            expect(recommendation).toHaveBeenCalledWith(expenses,budget)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith([
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
                  
            ])
        })
    })
})