import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";
const JWT_SECRET = process.env.JWT_SECRET as string;

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days,
  },
  jwt: {
    async encode({ secret, token }: any) {
      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      // @ts-ignore
      return jwt.verify(token, secret);
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
    async session({ session, user, token }) {
      console.log("session", session);
      console.log("user", user);
      console.log("token", token);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt     token", token);
      return token;
    },
  },
  pages: {},
  events: {},
  secret: process.env.JWT_SECRET,
});
