import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Auth.js configuration – the heart of login, logout and sessions.
export const { handlers, auth, signIn, signOut } = NextAuth({
  // The session is stored in an encrypted, httpOnly cookie (a JWT).
  // The email + password (Credentials) provider works with JWT sessions,
  // so no Session table is needed in the database.
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // the user is logged out automatically after 8 hours
  },

  // Use our own login page instead of the Auth.js default page
  pages: { signIn: "/login" },

  // The project runs on localhost (it is not deployed), so trust the local host name
  trustHost: true,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      // Runs when someone submits the login form.
      // Returns the user if the email and password are correct, otherwise null.
      async authorize(credentials) {
        const email = String(credentials.email ?? "").trim().toLowerCase();
        const password = String(credentials.password ?? "");
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });

        // Unknown email, inactive account and wrong password all give the SAME result,
        // so nobody can find out which emails are registered.
        if (!user || user.status !== "ACTIVE") return null;

        // Compare the typed password with the stored bcrypt hash
        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],

  callbacks: {
    // When the user logs in, save their id and role inside the encrypted session cookie
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },

    // Make the id and role available everywhere through auth()
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});
