import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
const prisma = require('../../../prisma/prisma_client') 
import { custum_error } from "../../../services/custum_error"

const GOOGLE_ID = process.env.GOOGLE_ID
const GOOGLE_SECRET = process.env.GOOGLE_SECRET

if (!GOOGLE_ID || !GOOGLE_SECRET) throw custum_error("GOOGLE_ID or GOOGLE_SECRET not found", 500)

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET, }),
        // ...add more providers here
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session, token, user }) {

            session.user.id = user.id

            return session
        }
    }
}

export default NextAuth(authOptions)