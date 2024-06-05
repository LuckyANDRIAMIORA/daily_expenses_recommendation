import {get_user_by_email, get_user_by_id, delete_user } from "../../../services/users.service";
const prisma = require('../../../prisma/prisma_client') 
import { custum_error } from "../../../services/custum_error";


describe("get_user_by_email test", () => {

    test("get_user_by_email should return the user when provided with existing email address.", async () => {
        const user = {
            id: "1",
            name: 'Lucky',
            email: 'lucky@gmail.com',
        }

        prisma.Users.findUnique.mockResolvedValue(user)

        get_user_by_email(user.email).then((result) => {
            expect(prisma.Users.findUnique).toHaveBeenCalledWith(
                {
                    where: {
                        email: 'lucky@gmail.com',
                    }
                }
            )
            expect(result).toEqual(user)
        })

    })

    test("get_user_by_email should throw 404 User not found! when provided with inexisting email address.", async () => {
        const email = 'lucky@gmail.com'

        prisma.Users.findUnique.mockImplementation(() => {
            throw custum_error('', 'P2001');
        })
        get_user_by_email(email).catch((err) => {
            expect(err.message).toEqual('User not found!')
            expect(err.code).toEqual(404)
        })
        expect(prisma.Users.findUnique).toHaveBeenCalledWith(
            {
                where: {
                    email: 'lucky@gmail.com',
                }
            }
        )
    })

})



describe("get_user_by_id test", () => {

    test("get_user_by_id should return the user when provided with existing id.", async () => {
        const user = {
            id: "1",
            name: 'Lucky',
            email: 'lucky@gmail.com',
        }

        prisma.Users.findUnique.mockResolvedValue(user)

        get_user_by_id(user.id).then((result) => {
            expect(prisma.Users.findUnique).toHaveBeenCalledWith(
                {
                    where: {
                        id: '1',
                    }
                }
            )
            expect(result).toEqual(user)
        })

    })

    test("get_user_by_id should throw 404 User not found! when provided with inexisting id.", async () => {
        const id = '0'

        prisma.Users.findUnique.mockImplementation(() => {
            throw custum_error('', 'P2001');
        })

        get_user_by_id(id).catch((err) => {
            expect(err.message).toEqual('User not found!')
            expect(err.code).toEqual(404)
        })

        expect(prisma.Users.findUnique).toHaveBeenCalledWith(
            {
                where: {
                    id: '0',
                }
            }
        )

    })

})



describe("delete_user test", () => {

    test("delete_user should delete the user by providing existing id to prisma.", async () => {
        const id= "1"

        prisma.Users.delete.mockImplementation(()=>{})
        delete_user(id).then(() => {
            expect(prisma.Users.delete).toHaveBeenCalledWith(
                {
                    where: {
                        id: '1',
                    }
                }
            )
        })

    })

    test("delete_user should throw 404 User not found! when provided with inexisting id.", async () => {
        const id = '0'

        prisma.Users.delete.mockImplementation(() => {
            throw custum_error('', 'P2001');
        })

        delete_user(id).catch((err) => {
            expect(err.message).toEqual('User not found!')
            expect(err.code).toEqual(404)
        })

        expect(prisma.Users.delete).toHaveBeenCalledWith(
            {
                where: {
                    id: '0',
                }
            }
        )

    })

})
