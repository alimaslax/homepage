import NextAuth from 'next-auth'
import OktaProvider from "next-auth/providers/okta";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENTID,
      clientSecret: process.env.OKTA_CLIENTSECRET,
      issuer: process.env.OKTA_ISSUER,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
}


export default NextAuth(authOptions)
