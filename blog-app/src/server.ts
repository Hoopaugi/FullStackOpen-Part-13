import app from "./app";
import { PORT } from "./config";
import sequelize from "./db";

const start = async () => {
  await sequelize.sync()

  app.listen(PORT, () => {
    console.log(`[server] Server is running at http://localhost:${PORT}`);
  });
}

start()
