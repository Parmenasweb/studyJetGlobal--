import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "./models/User";
// import User from "./models/User";
import connectDB from "./lib/db";
import { compare } from "bcryptjs";
// import bcrypt from "bcryptjs";
// import google from "next-auth/providers/google";

// class InvalidloginError extends CredentialsSignin {
//   code = "invalid Email or password";
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      profile(profile) {
        let userRole = "user";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
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
          const foundUser = await User.findOne({
            email: credentials.email,
          }).exec();
          if (foundUser) {
            const passwordMatch = await compare(
              credentials.password,
              foundUser.password
            );
            if (!passwordMatch) {
              throw new Error("Invalid email or password");
            }
            const userData = {
              id: foundUser._id,
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              email: foundUser.email,
              role: foundUser.role,
            };
            return userData;
          }
        } catch (err) {
          console.log(`errorr: ${err}`);
          // throw new InvalidloginError();
        }
        return null;
      },
    }),
    // CredentialsProvider({
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   name: "credentials",
    //   email: { label: "Email", type: "email" },
    //   password: { label: "Password", type: "password" },

    //   authorize: async (credentials) => {
    //     let user = null;
    //     const email = credentials.email.toString();
    //     const password = credentials.password.toString();

    //     if (!email || !password) {
    //       throw new CredentialsSignin("provide both email and password");
    //     }

    //     // // logic to salt and hash password
    //     // const pwHash = saltAndHashPassword(credentials.password)
    //     // connect to the database
    //     await connectDB();

    //     // logic to verify if user exists
    //     user = await User.findOne({ email }).select("password +role");

    //     if (!user) {
    //       // No user found, so this is their first attempt to login
    //       // meaning this is also the place you could do registration
    //       throw new Error("User not found");
    //     }

    //     // compare found user password to the entered pasword
    //     const isMatched = await compare(password, user.password);

    //     if (!isMatched) {
    //       throw new Error("password does not match");
    //     }

    //     const userData = {
    //       firstName: user.firstName,
    //       lastName: user.lastName,
    //       email: user.email,
    //       role: user.role,
    //       id: user._id,
    //     };

    //     // return user object with the their profile data
    //     return userData;555
    //   },555
    // }),
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
        token.image = user.picture;
      }
      return token;
    },
    // async session({ session, token }) {
    //   if (session) {
    //     return {
    //       ...session,
    //       id: token.id,
    //       role: token.role,
    //     };
    //   }
    //   return session;
    // },
    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "google") {
        await connectDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user.image,
              authProviderId: user.id,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("error saving user to the db");
          return false;
        }
      }
    },
  },
});
