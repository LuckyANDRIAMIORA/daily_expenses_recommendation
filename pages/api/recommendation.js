import { recommendation } from "../../services/recommendation.service";

export default async function handler(req, res) {
    if(req.method === 'POST'){
        const expenses = req.body 
        const {budget} = req.query

        const result = await recommendation(expenses, budget)
        res.status(200)
        res.json(result.result)
    }
}