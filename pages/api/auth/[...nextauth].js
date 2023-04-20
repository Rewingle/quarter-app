import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { compare } from 'bcryptjs';
//import { MongoClient } from 'mongodb';
import { connectToDatabase } from "../../../lib/mongo";
//import {MongoDbAdapter} from 'next-auth/adapters'

export const authOptions = {
  // Configure one or more authentication providers
  /*   providers: [
      CredentialsProvider({
        name: "Credentials",
    
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const { username, password } = credentials;
       
          
          if(username==='test@admin.com' && password==='test1234'){
              return {username:'test',password:'test1234'}
          }else return null;
        },
      }),
    ], */
   session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { db } = await connectToDatabase();

        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          //client.close();
          throw new Error('No user found!');
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Could not log you in!');
        }
        console.log(user)
        //client.close();
        //NAME : FIRST NAME , LASTNAME , PROVINCE , DISTRICT , NEIGHBORHOOD 
        return { name: user._id +','+ user.firstName +','+ user.lastName +','+user.userName+','+user.address.province+','+user.address.district+','+user.address.neighborhood, email: user.email, image:user.profilePic }
      },
    }),
  ],
  
  pages: {
    signIn: "/auth/login",
    error: '/auth/login'
  },
 
 /*  callbacks: {
    
    

    async session({ session, token, user }) {
      session.userID = token.id;
      session.userName = token.userName;

      session.fullname = token.fullname;

      //I also tried it this way, according to the docs at:
      //  https://next-auth.js.org/configuration/callbacks
      session.user.userID = token.id;
      session.user.fullname = token.fullname;

      return session;
    }
  }, */
};

export default NextAuth(authOptions);
