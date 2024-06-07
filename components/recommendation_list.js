import { useState } from "react"
import { act } from "@testing-library/react"

export default function Recommendation_list({ expenses }) {

    const [budget, set_budget] = useState(0)
    const [recommendation_list, set_recommendation] = useState([])
    const [total_value, set_value] = useState(0)

    const submit_form = async (e) => {
        e.preventDefault()

        const res = await fetch('/api/recommendation?budget=' + budget, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Add any other necessary headers here
            },
            body: JSON.stringify(expenses)
        });

        if (!res.ok) {

        } else {
            const { max_value, result } = await res.json()
            act(() => {
                set_recommendation(result);
                set_value(max_value)
            })
        }

    }

    return (
        <>
            <div>
                <div>
                    <h1>Recommendation</h1>
                </div>
                <div className="card w-96 bg-base-100 p-5">
                    <form onSubmit={submit_form}>
                        <label className="input input-bordered mb-5 flex items-center gap-2" htmlFor="budget">
                            budget:
                            <input
                                className="grow" placeholder="0"
                                type="number"
                                name="budget"
                                value={budget}
                                onChange={(e) => { set_budget(e.target.value) }}
                                id="budget" />
                        </label>
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-sm px-10" type="submit">submit</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h1>Recommendation list</h1>
                </div>
                <div>
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
                                    recommendation_list.map((expense, key) => (
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
            </div>
        </>
    )

}