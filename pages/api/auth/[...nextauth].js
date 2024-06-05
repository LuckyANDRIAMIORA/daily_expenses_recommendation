import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
const prisma = require('../../../prisma/prisma_client') 
import { custum_error } from "../../../services/custum_error"

const GITHUB_ID = process.env.GITHUB_ID
const GITHUB_SECRET = process.env.GITHUB_SECRET

if (!GITHUB_ID || !GITHUB_SECRET) throw custum_error("GITHUB_ID or GITHUB_SECRET not found", 500)

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET, }),
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