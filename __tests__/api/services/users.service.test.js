import { create_user, get_user_by_email, get_user_by_user_id, update_user, delete_user } from "../../../pages/api/services/users.service";
import prisma from "../../../prisma/prisma_client";
import { custum_error } from "../../../pages/api/services/custum_error";

describe("create_user test", () => {

    test("create_user should successfully create a new user with valid input.", async () => {
        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        prisma.Users.create.mockResolvedValue(user)

        create_user(user).then((result) => {
            expect(prisma.Users.create).toHaveBeenCalledWith(
                {
                    data: {
                        user_email: 'lucky@gmail.com',
                        user_name: 'Lucky',
                        user_password: '1234'
                    }
                }
            )
            expect(result).toEqual(user)
        })
    })


    test("create_user should throw 409 Email already in use! when provided with invalid user_email input.", async () => {
        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        prisma.Users.create.mockImplementation(() => {
            throw custum_error('', 'P2002');
        })

        create_user(user).catch((err) => {
            expect(err.message).toEqual('Email already in use!')
            expect(err.code).toEqual(409)
        })

        expect(prisma.Users.create).toHaveBeenCalledWith(
            {
                data: {
                    user_email: 'lucky@gmail.com',
                    user_name: 'Lucky',
                    user_password: '1234'
                }
            }
        )

    })

})




describe("get_user_by_email test", () => {

    test("get_user_by_email should return the user when provided with existing user_email address.", async () => {
        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        prisma.Users.findUnique.mockResolvedValue(user)

        get_user_by_email(user.user_email).then((result) => {
            expect(prisma.Users.findUnique).toHaveBeenCalledWith(
                {
                    where: {
                        user_email: 'lucky@gmail.com',
                    }
                }
            )
            expect(result).toEqual(user)
        })

    })

    test("get_user_by_email should throw 404 User not found! when provided with inexisting user_email address.", async () => {
        const user_email = 'lucky@gmail.com'

        prisma.Users.findUnique.mockImplementation(() => {
            throw custum_error('', 'P2001');
        })
        get_user_by_email(user_email).catch((err) => {
            expect(err.message).toEqual('User not found!')
            expect(err.code).toEqual(404)
        })
        expect(prisma.Users.findUnique).toHaveBeenCalledWith(
            {
                where: {
                    user_email: 'lucky@gmail.com',
                }
            }
        )
    })

})



describe("get_user_by_user_id test", () => {

    test("get_user_by_user_id should return the user when provided with existing user_id.", async () => {
        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        prisma.Users.findUnique.mockResolvedValue(user)

        get_user_by_user_id(user.user_id).then((result) => {
            expect(prisma.Users.findUnique).toHaveBeenCalledWith(
                {
                    where: {
                        user_id: '1',
                    }
                }
            )
            expect(result).toEqual(user)
        })

    })

    test("get_user_by_user_id should throw 404 User not found! when provided with inexisting user_id.", async () => {
        const user_id = '0'

        prisma.Users.findUnique.mockImplementation(() => {
            throw custum_error('', 'P2001');
        })

        get_user_by_user_id(user_id).catch((err) => {
            expect(err.message).toEqual('User not found!')
            expect(err.code).toEqual(404)
        })

        expect(prisma.Users.findUnique).toHaveBeenCalledWith(
            {
                where: {
                    user_id: '0',
                }
            }
        )

    })

})


describe("update_user test", () => {
    test("update_user should update user, with valid input and existing user_id.", async () => {
        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        prisma.Users.update.mockResolvedValue(user)

        update_user(user).then((result) => {
            expect(prisma.Users.update).toHaveBeenCalledWith({
                where: {
                    user_id: '1'
                },

                data: {
                    user_email: 'lucky@gmail.com',
                    user_name: 'Lucky',
                    user_password: '1234'
                }
            })
            expect(result).toEqual(user)
        })

    })

    test("update_user should throw 409 Email already in use! when provided with invalid user_email input.", async () => {
        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        prisma.Users.update.mockImplementation(() => {
            throw custum_error('', 'P2002');
        })

        update_user(user).catch((err) => {
            expect(err.message).toEqual('Email already in use!')
            expect(err.code).toEqual(409)
        })

        expect(prisma.Users.update).toHaveBeenCalledWith({
            where: {
                user_id: '1'
            },

            data: {
                user_email: 'lucky@gmail.com',
                user_name: 'Lucky',
                user_password: '1234'
            }
        })

    })

    test("update_user should throw 404 User not found! when provided with inexisting user_id.", async () => {
        const user = {
            user_id: "1",
            user_email: 'lucky@gmail.com',
            user_name: 'Lucky',
            user_password: '1234'
        }

        prisma.Users.update.mockImplementation(() => {
            throw custum_error('', 'P2001');
        })

        update_user(user).catch((err) => {
            expect(err.message).toEqual('User not found!')
            expect(err.code).toEqual(404)
        })

        expect(prisma.Users.update).toHaveBeenCalledWith({
            where: {
                user_id: '1'
            },

            data: {
                user_email: 'lucky@gmail.com',
                user_name: 'Lucky',
                user_password: '1234'
            }
        })


    })
})



describe("delete_user test", () => {

    test("delete_user should delete the user by providing existing user_id to prisma.", async () => {
        const user_id= "1"

        prisma.Users.delete.mockImplementation(()=>{})
        delete_user(user_id).then(() => {
            expect(prisma.Users.delete).toHaveBeenCalledWith(
                {
                    where: {
                        user_id: '1',
                    }
                }
            )
        })

    })

    test("delete_user should throw 404 User not found! when provided with inexisting user_id.", async () => {
        const user_id = '0'

        prisma.Users.delete.mockImplementation(() => {
            throw custum_error('', 'P2001');
        })

        delete_user(user_id).catch((err) => {
            expect(err.message).toEqual('User not found!')
            expect(err.code).toEqual(404)
        })

        expect(prisma.Users.delete).toHaveBeenCalledWith(
            {
                where: {
                    user_id: '0',
                }
            }
        )

    })

})
