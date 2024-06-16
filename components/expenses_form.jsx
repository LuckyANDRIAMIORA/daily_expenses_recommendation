import { useForm } from "react-hook-form";

export default function Expenses_form({ id, set_new_expense }) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const add_expense = async data => {

        const expense = {
            expense_name: data.expense_name,
            value: data.value,
            price: data.price,
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
            set_new_expense(new_expense)
        }

    }

    return (
        <>
            <div className="card w-96 bg-base-100 p-5 shadow-md">
                <h1 className="mb-5 card-title">Add new expense</h1>
                <form onSubmit={handleSubmit(add_expense)}>
                    <label className="input input-bordered mb-5 flex items-center gap-2" htmlFor="expense_name">
                        expense:
                        <input
                            className="grow" placeholder="Item"
                            type="text"
                            name="expense_name"
                            id="expense_name"
                            {...register('expense_name', {
                                required: 'Expense name is required',
                                validate: value => value.trim() !== '' || 'Expense name cannot be just a space'
                            })}
                        />
                    </label>
                    <div className="flex w-full my-5 justify-between">
                        <div>
                            <label className="input input-bordered flex items-center gap-2" htmlFor="value">
                                value:
                                <input
                                    className="grow w-16" placeholder="0"
                                    type="number"
                                    name="value"
                                    id="value"
                                    {...register('value', {
                                        validate: value => parseInt(value, 10) > 0 || 'Value must be greater than 0'
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="input input-bordered flex items-center gap-2" htmlFor="price">
                                price:
                                <input
                                    className="grow w-16" placeholder="0"
                                    type="number"
                                    name="price"
                                    id="price"
                                    {...register('price', {
                                        validate: value => parseInt(value, 10) > 0 || 'Price must be greater than 0'
                                    })}
                                />
                            </label>
                        </div>
                    </div>
                    {errors.expense_name?.message && <p className="text-red-600">{errors.expense_name.message}</p>}
                    {errors.price?.message && <p className="text-red-600">{errors.price.message}</p>}
                    {errors.value?.message && <p className="text-red-600">{errors.value.message}</p>}
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-sm px-10" type="submit">add</button>
                    </div>
                </form>
            </div>

        </>
    );
}