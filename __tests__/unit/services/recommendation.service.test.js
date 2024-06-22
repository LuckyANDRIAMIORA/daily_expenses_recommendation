import { recommendation } from "../../../services/recommendation.service";

test("take list of items that has value and price a returning the best combination of value bas on a given budget", async () => {
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

    const result = await recommendation(expenses, 15)

    expect(result.max_value).toEqual(22)
    expect(result.result).toEqual([
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

    expect(result.max_value).toEqual(22);

    expect(result.total_price).toEqual(15);
})

