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

        //client.close();
        return { email: user.email };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: '/auth/login'
  },
};

export default NextAuth(authOptions);
