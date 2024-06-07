import { recommendation } from "../../services/recommendation.service";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const expenses = req.body
            const { budget } = req.query

            const result = await recommendation(expenses, parseInt(budget))
            res.status(200)
            res.json(result)
        } catch (error) {
            res.status(error.code).send(error.message);
        }
    }
}