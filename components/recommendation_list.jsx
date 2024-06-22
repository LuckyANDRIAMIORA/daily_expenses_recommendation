import { useState } from "react"
import { useForm } from "react-hook-form";

export default function Recommendation_list({ expenses }) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [recommendation_list, set_recommendation] = useState([])
    const [total_value, set_value] = useState(0)
    const [total_price, set_total_price] = useState(0)
    const [budget, set_budget] = useState(0)

    const submit_form = async data => {

        const res = await fetch('/api/recommendation?budget=' + data.budget, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Add any other necessary headers here
            },
            body: JSON.stringify(expenses)
        });

        if (!res.ok) {

        } else {
            const { max_value, result, total_price } = await res.json()
            set_recommendation(result);
            set_value(max_value)
            set_total_price(total_price)
            set_budget(data.budget)
        }

    }

    return (
        <>
            <div className="card w-96 bg-base-100 p-5 shadow-md">
                <div>
                    <h1 className="card-title">Recommendation</h1>
                </div>
                <div className="card w-auto bg-base-100 p-5">
                    <form onSubmit={handleSubmit(submit_form)}>
                        <label className="input input-bordered mb-5 flex items-center gap-2" htmlFor="budget">
                            budget:
                            <input
                                className="grow" placeholder="0"
                                type="number"
                                name="budget"
                                id="budget"
                                {...register('budget', {
                                    validate: value => parseInt(value, 10) > 0 || 'budget must be greater than 0'
                                })}
                            />
                        </label>
                        {errors.budget?.message && <p className="text-red-600 pb-1">{errors.budget.message}</p>}
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-sm px-10" type="submit">submit</button>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="overflow-x-auto h-56">
                        <table className="table table-pin-rows">
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
                    <div className="flex flex-wrap flex-row justify-between">
                        <div>
                            <p>total price: {total_price}</p>
                        </div>
                        <div>
                            <p>rest: {budget - total_price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}