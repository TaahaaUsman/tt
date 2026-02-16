/**
 * Make a user super admin by email.
 * Run: node scripts/makeSuperAdmin.js your@email.com
 * (from backend directory, with MONGODB_URI in .env)
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.log("Usage: node scripts/makeSuperAdmin.js <email>");
    console.log("Example: node scripts/makeSuperAdmin.js admin@example.com");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const User = mongoose.models.User || (await import("../src/models/User.js")).default;
  const result = await User.updateOne(
    { email: email.toLowerCase().trim() },
    { $set: { role: "superadmin" } }
  );
  if (result.matchedCount === 0) {
    console.log("No user found with email:", email);
    process.exit(1);
  }
  console.log("Done. User", email, "is now super admin. Sign in with this account to access /admin.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
