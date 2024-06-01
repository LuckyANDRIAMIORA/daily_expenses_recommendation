import { create_user, get_user_by_user_id, delete_user, update_user } from "../services/users.service";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = req.body;
            const new_user = await create_user(user)
            res.status(200)
            res.json(new_user);
        } catch (err) {
            res.status(err.code)
            res.set(err.message)
        }
    } else if (req.method === 'GET') {
        try {
            const { searchParams } = new URL(req.url)
            const user_id = searchParams.get('user_id');
            const user_found = await get_user_by_user_id(user_id);
            user_found.user_password = '';
            res.status(200)
            res.json(user_found)
        } catch (err) {
            res.status(err.code)
            res.set(err.message)
        }

    } else if (req.method === 'DELETE') {
        try {
            const { searchParams } = new URL(req.url)
            const user_id = searchParams.get('user_id');
            await delete_user(user_id);
            res.status(200)
            res.set('User deleted successfully!')
        } catch (err) {
            res.status(err.code)
            res.set(err.message)
        }
    } else if (req.method === 'PUT') {
        try {
            const user = req.body;
            const user_updated = await update_user(user)
            res.status(200)
            res.json(user_updated);
        } catch (err) {
            res.status(err.code)
            res.set(err.message)
        }
    }
}