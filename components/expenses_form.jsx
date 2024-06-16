import { act } from "@testing-library/react";
import { useState } from "react";

export default function Expenses_form({ id, set_new_expense }) {

    const [expense_name, set_expense_name] = useState('')
    const [value, set_value] = useState(0)
    const [price, set_price] = useState(0)

    const add_expense = async (e) => {
        e.preventDefault()
        const expense = {
            expense_name: expense_name,
            value: value,
            price: price,
            user_id: id
        }

        const res = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense)
        })

        if (!res.ok) {

        } else {
            const new_expense = await res.json();
            act(() => {
                set_expense_name('')
                set_price(0)
                set_value(0)
                set_new_expense(new_expense)
            })
        }

    }

    return (
        <>
            <div className="card w-96 bg-base-100 p-5 shadow-md">
                <h1 className="mb-5 card-title">Add new expense</h1>
                <form onSubmit={add_expense}>
                    <label className="input input-bordered mb-5 flex items-center gap-2" htmlFor="expense_name">
                        expense:
                        <input
                            className="grow" placeholder="Item"
                            type="text"
                            name="expense_name"
                            value={expense_name}
                            onChange={(e) => { set_expense_name(e.target.value) }}
                            id="expense_name"
                        />
                    </label>
                    <div className="flex w-full my-5 justify-between">
                        <label className="input input-bordered flex items-center gap-2" htmlFor="value">
                            value:
                            <input
                                className="grow w-16" placeholder="0"
                                type="number"
                                name="value"
                                value={value}
                                onChange={(e) => { set_value(e.target.value) }}
                                id="value"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2" htmlFor="price">
                            price:
                            <input
                                className="grow w-16" placeholder="0"
                                type="number"
                                name="price"
                                value={price}
                                onChange={(e) => { set_price(e.target.value) }}
                                id="price"
                            />
                        </label>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-sm px-10" type="submit">add</button>
                    </div>
                </form>
            </div>

        </>
    );
}