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

        if(!res.ok){

        }else{
            const result = await res.json()
            act(() => {
                set_recommendation(result.result);
                set_value(result.max_value)
            })    
        }

    }

    return (
        <>
            <div>
                <div>
                    <h1>Recommendation</h1>
                </div>
                <div>
                    <form onSubmit={submit_form}>
                        <label htmlFor="budget">budget</label>
                        <input
                            type="number"
                            name="budget"
                            value={budget}
                            onChange={(e) => { set_budget(e.target.value) }}
                            id="budget" />
                        <button type="submit">submit</button>
                    </form>
                </div>
                <div>
                    <h1>Recommendation list</h1>
                </div>
                <div>
                    <ul id="expenses_list">
                        {
                            expenses.map((expense, key) => (
                                <li key={key}>{expense.expense_name}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )

}