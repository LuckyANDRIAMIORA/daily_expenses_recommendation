import { useEffect, useState } from "react";

export default function List_expenses({ user_id, new_expense, expenses, set_expenses }) {

    const [deleted_expense, set_deleted_expense] = useState({})

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
            set_expenses(user.expenses)
        }

    }

    const delete_expense = async(expense)=>{
        const expense_id = await expense.expense_id
        const res = await fetch('api/expenses?expense_id='+expense_id,{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
            },
        })

        if (!res.ok){

        }else{
            set_deleted_expense(expense)
        }
    }

    useEffect(() => {
        fetch_data()
    }, [new_expense, deleted_expense]);

    return (
        <>
            <div className="card w-96 bg-base-100 p-5 shadow-md">
                <h1 className="card-title">Expenses list</h1>
                <div className="overflow-x-auto h-96">
                    <table className="table table-pin-rows">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>expense</th>
                                <th>value</th>
                                <th>price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expenses.map((expense, key) => (
                                    <tr key={key}>
                                        <td>{expense.expense_name}</td>
                                        <td>{expense.value}</td>
                                        <td>{expense.price}</td>
                                        <td><button onClick={()=>delete_expense(expense)} className="btn btn-sm btn-warning">del</button></td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}