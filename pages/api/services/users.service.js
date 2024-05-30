import prisma from '../../../prisma/prisma_client';
import { custum_error } from './custum_error';

export const create_user = async (user) => {
    try {

        const new_user = await prisma.Users.create({
            data: {
                user_email: user.user_email,
                user_name: user.user_name,
                user_password: user.user_password
            }
        })

        return new_user;

    } catch (error) {
        if (error.code === 'P2002') throw custum_error('Email already in use!', 409)
        throw custum_error('Something went wrong!', 500)
    }
}

export const get_user_by_email = async (user_email) => {

    try {
        const user = await prisma.Users.findUnique({
            where: {
                user_email: user_email
            }
        })

        return user;

    } catch (error) {
        if (error.code === 'P2001') throw custum_error('User not found!', 404)
        throw custum_error('Something went wrong!', 500)
    }
}

export const get_user_by_user_id = async (user_id) => {

    try {
        const user = await prisma.Users.findUnique({
            where: {
                user_id: user_id
            }
        })

        return user;

    } catch (error) {
        if (error.code === 'P2001') throw custum_error('User not found!', 404)
        throw custum_error('Something went wrong!', 500)
    }
}

export const update_user = async (user_update) => {

    try {
        const updated_user = await prisma.Users.update({
            where: {
                user_id: user_update.user_id
            },
            data: {
                user_email: user_update.user_email,
                user_name: user_update.user_name,
                user_password: user_update.user_password
            }
        });
        return updated_user;
    } catch (error) {
        if (error.code === 'P2002') throw custum_error('Email already in use!', 409)
        if (error.code === 'P2001') throw custum_error('User not found!', 404)
        throw custum_error('Something went wrong!', 500)
    }

}


export const delete_user = async (user_id) => {
    try {
        await prisma.Users.delete({
            where: {
                user_id: user_id
            }
        })
    } catch (error) {
        if (error.code === 'P2001') throw custum_error('User not found!', 404)
        throw custum_error('Something went wrong!', 500)
    }
}