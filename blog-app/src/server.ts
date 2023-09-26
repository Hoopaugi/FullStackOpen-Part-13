import app from "./app";
import db from "./db";
import { PORT, NODE_ENV } from "./config";
import { seedDatabase } from "./db/utils";

const start = async () => {
  await db.connect()

  if(NODE_ENV === 'development') {
    await db.drop()

    await db.sync()

    await seedDatabase()
  }

  app.listen(PORT, () => {
    console.log(`[server] Server is running at http://localhost:${PORT}`);
  });
}

start()
