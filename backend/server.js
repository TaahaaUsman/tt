import "dotenv/config";
import connectToDatabase from "./src/config/db.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 5001;

async function start() {
  await connectToDatabase();
  app.listen(PORT, "127.0.0.1", () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
  );
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
