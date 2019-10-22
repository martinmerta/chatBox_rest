import mongoose from 'mongoose';
import Express from 'express';

export const connectToDB = async (
  url: string,
  app: Express.Express,
  port: string | number
) => {
  try {
    await mongoose.connect(url);
    return app.listen(port);
  } catch (err) {
    throw new Error(err);
  }
};
