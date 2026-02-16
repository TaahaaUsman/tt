/**
 * One-time seed: store Unsplash image URLs in Category documents.
 * Run from backend folder: node scripts/seedCategoryImages.js
 * Requires MONGODB_URI in .env
 */
import "dotenv/config";
import mongoose from "mongoose";
import Category from "../src/models/Category.js";
import { CATEGORY_IMAGE_URLS } from "../src/data/categoryImages.js";

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("Set MONGODB_URI in .env");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB");

  let updated = 0;
  for (const [categoryId, imageUrl] of Object.entries(CATEGORY_IMAGE_URLS)) {
    const result = await Category.findByIdAndUpdate(
      categoryId,
      { imageUrl },
      { new: true }
    );
    if (result) {
      updated++;
      console.log(`  ✓ ${result.name}`);
    } else {
      console.warn(`  ✗ Category not found: ${categoryId}`);
    }
  }

  console.log(`\nDone. Updated ${updated} categories with imageUrl.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
