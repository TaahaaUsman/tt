import db from "../config/db.js";
import Course from "../models/Course.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";
import { getCourseImageUrl } from "../data/categoryImages.js";

async function getCategoryImageMap() {
  const categories = await Category.find().select("_id imageUrl").lean();
  const map = {};
  categories.forEach((c) => {
    if (c.imageUrl) map[c._id.toString()] = c.imageUrl;
  });
  return map;
}

function withImageUrl(course, categoryImageMap) {
  const doc = course.toObject ? course.toObject() : { ...course };
  doc.imageUrl = getCourseImageUrl(doc, categoryImageMap);
  return doc;
}

export async function getAllCourses() {
  await db();
  const [courses, categoryImageMap] = await Promise.all([
    Course.find().select("-createdAt -updatedAt -__v"),
    getCategoryImageMap(),
  ]);
  if (!courses?.length) return { error: "No course added yet", status: 500 };
  return { data: courses.map((c) => withImageUrl(c, categoryImageMap)) };
}

export async function getCourseDetails(courseId) {
  await db();
  if (!courseId) return { error: "Please send courseId first", status: 401 };
  const [courseExist, categoryImageMap] = await Promise.all([
    Course.findOne({ _id: courseId }),
    getCategoryImageMap(),
  ]);
  if (!courseExist) return { error: "Course does not exist", status: 401 };
  await Course.findByIdAndUpdate(courseId, { $inc: { visitCount: 1 } }, { new: true });
  return { data: withImageUrl(courseExist, categoryImageMap) };
}

export async function getBookmarkedCourses(token) {
  await db();
  if (!token) return { error: "Unauthorized: Token missing", status: 401 };
  const decoded = verifyToken(token);
  const userId = decoded?.id || decoded?._id;
  if (!userId) return { error: "Invalid token or user ID missing in token", status: 401 };
  const user = await User.findById(userId);
  if (!user) return { error: "User not found", status: 404 };
  const bookmarkedCourseIds = user.bookmarkedCourses || [];
  const [courses, categoryImageMap] = await Promise.all([
    bookmarkedCourseIds.length
      ? Course.find({ _id: { $in: bookmarkedCourseIds } })
      : [],
    getCategoryImageMap(),
  ]);
  return { data: courses.map((c) => withImageUrl(c, categoryImageMap)) };
}

export async function bookmarkCourse(courseId, token) {
  await db();
  if (!courseId) return { error: "Please send courseId first", status: 400 };
  const courseExist = await Course.findOne({ _id: courseId });
  if (!courseExist) return { error: "Course does not exist", status: 404 };
  if (!token) return { error: "Unauthorized: Token missing", status: 401 };
  const decoded = verifyToken(token);
  const userId = decoded?.id || decoded?._id;
  if (!userId) return { error: "Invalid token or user ID missing in token", status: 401 };
  const user = await User.findById(userId);
  if (!user) return { error: "User not found", status: 404 };
  user.bookmarkedCourses.addToSet(courseId);
  await user.save();
  return { success: true, message: "Bookmarked successfully" };
}

export async function unbookmarkCourse(courseId, token) {
  await db();
  if (!token) return { error: "Unauthorized: Token missing", status: 401 };
  const decoded = verifyToken(token);
  const userId = decoded?.id || decoded?._id;
  if (!userId) return { error: "Invalid token or user ID missing in token", status: 401 };
  if (!courseId) return { error: "Please provide a courseId", status: 400 };
  const user = await User.findById(userId);
  if (!user) return { error: "User not found", status: 404 };
  user.bookmarkedCourses = user.bookmarkedCourses.filter((id) => id.toString() !== courseId);
  await user.save();
  return { success: true, message: "Course unbookmarked successfully" };
}
