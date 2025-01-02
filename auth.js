import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "./models/User";
import connectDB from "./lib/db";
import { compare } from "bcryptjs";

class InvalidLoginError extends CredentialsSignin {
  code = "invalid Email or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      name: "google",
      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
          role: "user",
        };
      },
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user || !user.isActive) {
            throw new InvalidLoginError();
          }

          const passwordMatch = await compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            throw new InvalidLoginError();
          }

          await User.findByIdAndUpdate(user._id, {
            lastLogin: new Date(),
          });

          return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("Authentication error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/register",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.image = user.picture || user.image;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "google") {
        await connectDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              firstName: user.name.split(" ")[0],
              lastName: user.name.split(" ").slice(1).join(" "),
              email: user.email,
              image: user.image,
              authProviderId: user.id,
              role: "user",
              password: Math.random().toString(36).slice(-8),
            });
            await newUser.save();
          }
          return true;
        } catch (err) {
          console.error("Error saving user:", err);
          return false;
        }
      }
    },
  },
});
