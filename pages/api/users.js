import { get_user_by_id, delete_user} from "../../services/users.service";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query
            const user_found = await get_user_by_id(id);
            res.status(200)
            res.json(user_found)
        } catch (err) {
            res.status(err.code).send(err.message)
        }

    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.query
            await delete_user(id);
            res.status(200).send('User deleted successfully!')
        } catch (err) {
            res.status(err.code).send(err.message)
        }
    }
}