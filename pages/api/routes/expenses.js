import { create_expense, delete_expense } from '../services/expenses.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const expense = req.body;
            const expense_created = await create_expense(expense)
            res.status(200);
            res.json(expense_created);
        } catch (error) {
            res.status(error.code);
            res.set(error.message);
        }
    } else if (req.method === 'DELETE') {
        try {
            const { searchParams } = new URL(req.url)
            const expense_id = searchParams.get('expense_id');
            await delete_expense(expense_id);
            res.status(200)
            res.set('Expense deleted successfully!')
        } catch (err) {
            res.status(err.code)
            res.set(err.message)
        }

    }
}