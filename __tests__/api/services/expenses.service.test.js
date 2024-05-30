import prisma from "../../../prisma/prisma_client";
import { custum_error } from "../../../pages/api/services/custum_error";
import { create_expense, delete_expense } from "../../../pages/api/services/expenses.service";


describe("create_expense test", () => {

    test("create_expense should successfully create a new expense with valid input.", async () => {
        const expense = {
            expense_id: '1',
            expense_name: 'stuff',
            value: 10,
            price: 1000,
            user_id: '1'
        }

        prisma.Expenses.create.mockResolvedValue(expense);
        create_expense(expense).then((result) => {
            expect(prisma.Expenses.create).toHaveBeenCalledWith({
                data: {
                    expense_name: 'stuff',
                    value: 10,
                    price: 1000,
                    user: {
                        connect: {
                            user_id: '1'
                        }
                    }
                }
            })

            expect(result).toEqual(expense);
        })
    })

    test("create_expense should throw 404 User not found! when provided with invalid user_id input.", async () => {
        const expense = {
            expense_id: '1',
            expense_name: 'stuff',
            value: 10,
            price: 1000,
            user_id: '1'
        }

        prisma.Expenses.create.mockImplementation(() => {
            throw custum_error('', 'P2003')
        });

        create_expense(expense).catch((err) => {
            expect(err.message).toEqual('User not found!');
            expect(err.code).toEqual(404);
        })

        expect(prisma.Expenses.create).toHaveBeenCalledWith({
            data: {
                expense_name: 'stuff',
                value: 10,
                price: 1000,
                user: {
                    connect: {
                        user_id: '1'
                    }
                }
            }
        })

    })

})





describe("delete_expense test", () => {

    test("delete_expense should delete the expense by providing existing expense_id to prisma.", async () => {
        const expense_id= "1"

        prisma.Expenses.delete.mockImplementation(()=>{})
        delete_expense(expense_id).then(() => {
            expect(prisma.Expenses.delete).toHaveBeenCalledWith(
                {
                    where: {
                        expense_id: '1',
                    }
                }
            )
        })

    })

    test("delete_expense should throw 404 Expense not found! when provided with inexisting expense_id.", async () => {
        const expense_id = '0'

        prisma.Expenses.delete.mockImplementation(() => {
            throw custum_error('', 'P2001');
        })

        delete_expense(expense_id).catch((err) => {
            expect(err.message).toEqual('Expense not found!')
            expect(err.code).toEqual(404)
        })

        expect(prisma.Expenses.delete).toHaveBeenCalledWith(
            {
                where: {
                    expense_id: '0',
                }
            }
        )

    })

})
