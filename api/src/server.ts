import { app } from "./app";
import { prisma } from "./db";
import { log } from "./utils/logger";

const port = Number(process.env.PORT ?? 3000);

const server = app.listen(port, () => {
  log("info", "api_started", { port });
});

const shutdown = async () => {
  log("info", "shutdown_started");
  const forceExitTimer = setTimeout(() => {
    log("error", "shutdown_timeout");
    process.exit(1);
  }, 10000);

  server.close(async () => {
    await prisma.$disconnect();
    clearTimeout(forceExitTimer);
    log("info", "shutdown_complete");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
