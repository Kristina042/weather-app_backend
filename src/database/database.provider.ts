import { MongoClient } from 'mongodb';

export const databaseProvider = {
  provide: 'DATABASE',

  useFactory: async () => {
    const client =
      new MongoClient(
        process.env.MONGODB_URI!,
        {
          tls: true
        }
      );

    await client.connect();

    return client.db();
  },
};