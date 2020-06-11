import mongoose from "mongoose";

export * as factories from "./factories";

declare global {
  const __MONGO_DB_NAME__: string;
  const __MONGO_CONNECTION__: string;
}

const collections = Object.keys(mongoose.connection.collections);

export const connect = () =>
  mongoose.connect(__MONGO_CONNECTION__, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export const disconnect = () => mongoose.disconnect();

export const reset = async () => {
  for (const collection of collections) {
    try {
      await mongoose.connection.collections[collection].drop();
    } catch (error) {
    }
  }
};
