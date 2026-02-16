/**
 * Unique picture per subject (course): each category has a pool of Unsplash images.
 * We pick one per course by hashing course._id so each course gets a different image.
 * License: https://unsplash.com/license
 */
const U = (id) => `https://images.unsplash.com/photo-${id}?w=400&h=240&fit=crop`;

// Verified Unsplash photo IDs (one per topic; we reuse to build 6 per category)
const PHOTOS = {
  calculator: "1554224155-6726b3ff858f",
  dna: "1576086213369-97a306d5a1a4",
  lab: "1532187863486-abf72db67f1e",
  laptop: "1498050108023-c5249f4df085",
  charts: "1611974789850-c8a0edd7b3e2",
  books: "1507003211169-0a1dd7228f2d",
  art: "1512820790803-83ca734da794",
  law: "1589829545856-d10d557cf95f",
  team: "1552664730-d307ca884978",
  analytics: "1460925895917-afdab827c52f",
  media: "1478737270239-2f02b77fc618",
  math: "1635070041078-e36335be0f54",
  microscope: "1532187643603-ba119ca4109e",
  physics: "1636466497217-26a8cbeaf0aa",
  energy: "1473341304170-971dccb5ac1e",
  stats: "1551288049-bebda4e38f71",
  brain: "1559757148-5c350d0d3c56",
  people: "1529156069898-49953e39b3ac",
  wildlife: "1564349683136-77e3d7167ad7",
};
const p = (key) => U(PHOTOS[key] || PHOTOS.books);

/** Multiple images per category – each course gets one by hash(courseId) */
export const CATEGORY_IMAGE_POOLS = {
  "680a1bc4db33f7d835929422": [p("calculator"), p("charts"), p("analytics"), p("calculator"), p("charts"), p("team")],
  "680a1d17db33f7d835929426": [p("dna"), p("lab"), p("microscope"), p("dna"), p("lab"), p("microscope")],
  "680a1d23db33f7d835929429": [p("lab"), p("microscope"), p("dna"), p("lab"), p("microscope"), p("dna")],
  "680a1d2fdb33f7d83592942c": [p("laptop"), p("analytics"), p("math"), p("laptop"), p("media"), p("charts")],
  "680a1d3edb33f7d83592942f": [p("charts"), p("calculator"), p("analytics"), p("team"), p("charts"), p("calculator")],
  "680a1d4adb33f7d835929432": [p("books"), p("art"), p("law"), p("books"), p("art"), p("books")],
  "680a1d57db33f7d835929435": [p("art"), p("books"), p("people"), p("art"), p("books"), p("law")],
  "680a1d5fdb33f7d835929438": [p("law"), p("books"), p("art"), p("law"), p("books"), p("people")],
  "680a1d68db33f7d83592943b": [p("team"), p("analytics"), p("charts"), p("team"), p("people"), p("media")],
  "680a1d73db33f7d83592943e": [p("analytics"), p("team"), p("charts"), p("laptop"), p("media"), p("people")],
  "680a1d83db33f7d835929441": [p("media"), p("laptop"), p("team"), p("books"), p("analytics"), p("people")],
  "680a1d92db33f7d835929444": [p("math"), p("stats"), p("physics"), p("calculator"), p("charts"), p("math")],
  "680a1da3db33f7d835929447": [p("microscope"), p("lab"), p("dna"), p("microscope"), p("lab"), p("wildlife")],
  "680a1dacdb33f7d83592944a": [p("physics"), p("math"), p("energy"), p("stats"), p("physics"), p("lab")],
  "680a1db6db33f7d83592944d": [p("energy"), p("physics"), p("charts"), p("energy"), p("stats"), p("lab")],
  "680a1ddddb33f7d835929450": [p("stats"), p("math"), p("charts"), p("analytics"), p("stats"), p("calculator")],
  "680a1de8db33f7d835929453": [p("brain"), p("books"), p("people"), p("brain"), p("art"), p("books")],
  "680a1dfddb33f7d835929456": [p("people"), p("team"), p("brain"), p("art"), p("people"), p("books")],
  "680a1e03db33f7d835929459": [p("wildlife"), p("microscope"), p("dna"), p("wildlife"), p("lab"), p("microscope")],
};

function hashId(id) {
  if (id == null) return 0;
  const s = String(id);
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/**
 * Returns a unique image URL for this course (per subject).
 * 1) course.thumbnailUrl if set
 * 2) else one from category pool by hash(course._id)
 */
export function getCourseImageUrl(course, dbCategoryImages = {}) {
  if (!course) return null;
  if (course.thumbnailUrl) return course.thumbnailUrl;
  const categoryId = course.categoryId?.toString?.() || course.categoryId;
  if (!categoryId) return null;
  const dbUrl = dbCategoryImages[categoryId];
  const pool = CATEGORY_IMAGE_POOLS[categoryId];
  if (dbUrl && !pool) return dbUrl;
  if (!pool?.length) return dbUrl ?? null;
  const index = hashId(course._id ?? course.code) % pool.length;
  return pool[index];
}

export const CATEGORY_IMAGE_URLS = Object.fromEntries(
  Object.entries(CATEGORY_IMAGE_POOLS).map(([id, arr]) => [id, arr[0]])
);
