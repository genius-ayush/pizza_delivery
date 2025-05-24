import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
        
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // pages: {
  //   signIn: "/api/auth/signin",
  //   signOut: "/api/auth/signout",
  //   error: "/api/auth/error",
  // },

  
  callbacks: {
    // async session({ session, token }) {
    //   return session
    // },

    async signIn(params) {
      if (!params.user.email) {
        return false;
      }
      

      return true;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`; // Redirects user to /dashboard after login
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
