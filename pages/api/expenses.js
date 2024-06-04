import { create_expense, delete_expense } from '../../services/expenses.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const expense = req.body;
            const expense_created = await create_expense(expense)
            res.status(200);
            res.json(expense_created);
        } catch (error) {
            res.status(error.code).send(error.message);
        }
    } else if (req.method === 'DELETE') {
        try {
            const {expense_id} = req.query
            await delete_expense(parseInt(expense_id));
            res.status(200).send('Expense deleted successfully!')
        } catch (err) {
            res.status(err.code).send(err.message)
        }

    }
}