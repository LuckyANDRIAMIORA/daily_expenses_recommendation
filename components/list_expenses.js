import { act } from "@testing-library/react";
import { useEffect, useState } from "react";
import Recommendation_list from "./recommendation_list";

export default function List_expenses({ user_id, new_expense }) {

    const [expenses, set_expenses] = useState([]);

    const fetch_data = async () => {
        const res = await fetch('/api/users?id=' + user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Add any other necessary headers here
            },
        })

        if (!res.ok) {

        } else {
            const user = await res.json()
            act(() => set_expenses(user.expenses))
        }

    }

    useEffect(() => {
        fetch_data()
    }, [new_expense]);

    return (
        <>
            <div>
                <h1>Expenses list</h1>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>expense</th>
                                <th>value</th>
                                <th>price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expenses.map((expense, key) => (
                                    <tr key={key}>
                                        <th>{expense.expense_id}</th>
                                        <td>{expense.expense_name}</td>
                                        <td>{expense.value}</td>
                                        <td>{expense.price}</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <Recommendation_list expenses={expenses} />
            </div>

        </>
    );
}