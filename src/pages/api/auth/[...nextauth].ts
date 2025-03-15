/* eslint-disable @typescript-eslint/prefer-as-const */
import { fauna } from "@/services/fauna";
import { fql } from "fauna";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: { scope: "read:user" },
      },
    }),
  ],
  session: {
    strategy: "jwt" as "jwt",
  },
  callbacks: {
    async signIn({ user }: { user: { email?: string | null } }) {
      /* from create a new collection
      const query = fql`
      Collection.create({
      name: "users"})` 
      */
      const { email } = user;

      try {
        if (!email) return false;

        const queryUserExists = fql`
          users.user_by_email(${email}).first()`;

        const userExists = await fauna.query(queryUserExists);

        if (userExists.data) {
          return true;
        }

        const query = fql`
        users.create({
          email: ${email!}
        })
      `;

        await fauna.query(query);
        return true;
      } catch {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
