import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUrl = process.env.MONGODB_URL as string;

if (!mongoUrl) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}

const client = new MongoClient(mongoUrl);
const db = client.db("Devo-auth");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});
