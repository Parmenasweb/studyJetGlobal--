import CredentialsProvider from "next-auth/providers/credentials";
import User from "./models/User";
import connectDB from "./lib/db";
import { compare } from "bcryptjs";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Ensure database connection
          await connectDB();
          
          const user = await User.findOne({ email: credentials.email }).select('+password');

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isActive) {
            throw new Error("This account has been deactivated");
          }

          if (!user.password) {
            throw new Error("Password not set for this account");
          }

          const isValidPassword = await compare(
            credentials.password.trim(),
            user.password
          );
          
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          // Update last login without waiting
          User.findByIdAndUpdate(user._id, {
            lastLogin: new Date(),
          }).catch(error => {
            console.error("Failed to update last login:", error);
          });

          return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw error; // Propagate error for better error handling
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}