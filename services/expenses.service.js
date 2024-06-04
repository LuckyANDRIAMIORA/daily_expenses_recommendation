import prisma from '../prisma/prisma_client';
import { custum_error } from './custum_error';

export const create_expense = async (expense) => {
    try {
        const new_expense = await prisma.Expenses.create({
            data: {
                expense_name: expense.expense_name,
                value: expense.value,
                price: expense.price,
                user: {
                    connect: {
                        id: expense.user_id
                    }
                }
            }
        })

        return new_expense;

    } catch (error) {
        if (error.code === 'P2003') throw custum_error('User not found!', 404)
        throw custum_error('Something went wrong!', 500)
    }
}

export const delete_expense = async (expense_id) => {
    try {
        await prisma.Expenses.delete({
            where: {
                expense_id: expense_id
            }
        })

    } catch (error) {
        if (error.code === 'P2001') throw custum_error('Expense not found!', 404)
        throw custum_error('Something went wrong!', 500)
    }
}