import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/lib/utils/models/User";
import { connectDB } from "@/app/lib/utils/mongodb";
import bcrypt from "bcryptjs";
import { register } from "@/app/lib/actions/register";

export const authOptions: any = {
  pages: {
    signIn: "/components/layout/login"
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" }
      },

      async authorize(credentials: any) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email
        });

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || ""
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }: any) {
      if (url === "/api/auth/callback/google") {
        return "/";
      }
      return baseUrl;
    },

    async signIn({ user }: any) {
      if (!user.password) {
        const status = await register({
          email: user.email,
          password: "",
          name: user.name
        });

        if (status?.error) {
          console.log(status.error);
          return true;
        }
      }

      return true;
    },

    async session({ session, user, token }: any) {
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    }
  }
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
