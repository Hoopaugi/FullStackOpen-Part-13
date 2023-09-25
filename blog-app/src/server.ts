import app from "./app";
import { PORT } from "./config";

import db from "./db";

const start = async () => {
  await db.connect()

  app.listen(PORT, () => {
    console.log(`[server] Server is running at http://localhost:${PORT}`);
  });
}

start()
