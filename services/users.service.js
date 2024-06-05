const prisma = require('../prisma/prisma_client')
import { custum_error } from './custum_error';

export const get_user_by_email = async (email) => {

    try {
        const user = await prisma.User.findUnique({
            where: {
                email: email
            },
            include: {
                expenses: true
            }
        })

        return user;

    } catch (error) {
        if (error.code === 'P2001') throw custum_error('User not found!', 404)
        throw custum_error('Something went wrong!', 500)
    }
}

export const get_user_by_id = async (id) => {

    try {
        const user = await prisma.User.findUnique({
            where: {
                id: id
            },
            include: {
                expenses: true
            }
        })

        return user;

    } catch (error) {
        if (error.code === 'P2001') throw custum_error('User not found!', 404)
        throw custum_error(error.message, 500)
    }
}

export const delete_user = async (id) => {
    try {
        await prisma.User.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        if (error.code === 'P2001') throw custum_error('User not found!', 404)
        throw custum_error('Something went wrong!', 500)
    }
}