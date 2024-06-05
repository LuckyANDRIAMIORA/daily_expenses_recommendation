import { act } from "@testing-library/react";
import {useState } from "react";
import List_expenses from "./list_expenses";

export default function Expenses_form({ id }) {

    const [expense_name, set_expense_name] = useState('')
    const [value, set_value] = useState(0)
    const [price, set_price] = useState(0)
    const [new_expense, set_expenses] = useState({})

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
            act(()=>{
                set_expenses(new_expense)
            })
        }

    }

    return (
        <>
            <div>
                <form onSubmit={add_expense}>
                    <label htmlFor="expense_name">expense</label>
                    <input
                        type="text"
                        name="expense_name"
                        value={expense_name}
                        onChange={(e) => { set_expense_name(e.target.value) }}
                        id="expense_name"
                    />
                    <label htmlFor="value">value</label>
                    <input
                        type="number"
                        name="value"
                        value={value}
                        onChange={(e) => { set_value(e.target.value) }}
                        id="value"
                    />
                    <label htmlFor="price">price</label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => { set_price(e.target.value) }}
                        id="price"
                    />
                    <button type="submit">add</button>
                </form>
            </div>
            <div>
                <List_expenses user_id={id} new_expense={new_expense}/>
            </div>
        </>
    );
}