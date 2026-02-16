/**
 * Mock data for discover sections (Suggested, Trending, Popular, Hot new).
 * Replace with real API later: e.g. /api/courses/suggested, /api/courses/trending, /api/courses/popular
 * Cards with isMock: true link to /courses (browse) instead of course detail.
 */
const U = (id) => `https://images.unsplash.com/photo-${id}?w=400&h=240&fit=crop`;
const mock = (c) => ({ ...c, isMock: true });

export const MOCK_SUGGESTED = [
  mock({ _id: "mock-suggested-1", code: "CS101", title: "Introduction to Programming", categoryId: "680a1d2fdb33f7d83592942c", imageUrl: U("1498050108023-c5249f4df085"), categoryName: "Computer Science/Information Technology" }),
  mock({ _id: "mock-suggested-2", code: "MTH101", title: "Calculus and Analytical Geometry", categoryId: "680a1d92db33f7d835929444", imageUrl: U("1635070041078-e36335be0f54"), categoryName: "Mathematics" }),
  mock({ _id: "mock-suggested-3", code: "ENG101", title: "English Comprehension and Composition", categoryId: "680a1d4adb33f7d835929432", imageUrl: U("1507003211169-0a1dd7228f2d"), categoryName: "English" }),
  mock({ _id: "mock-suggested-4", code: "PSY101", title: "Introduction to Psychology", categoryId: "680a1de8db33f7d835929453", imageUrl: U("1559757148-5c350d0d3c56"), categoryName: "Psychology" }),
];

export const MOCK_TRENDING = [
  mock({ _id: "mock-trending-1", code: "CS201", title: "Data Structures and Algorithms", categoryId: "680a1d2fdb33f7d83592942c", imageUrl: U("1611974789850-c8a0edd7b3e2"), categoryName: "Computer Science/Information Technology" }),
  mock({ _id: "mock-trending-2", code: "STA201", title: "Statistics and Probability", categoryId: "680a1ddddb33f7d835929450", imageUrl: U("1551288049-bebda4e38f71"), categoryName: "Probability & Statistics" }),
  mock({ _id: "mock-trending-3", code: "MGT501", title: "Strategic Management", categoryId: "680a1d68db33f7d83592943b", imageUrl: U("1552664730-d307ca884978"), categoryName: "Management" }),
  mock({ _id: "mock-trending-4", code: "PHY101", title: "Physics for Engineers", categoryId: "680a1dacdb33f7d83592944a", imageUrl: U("1636466497217-26a8cbeaf0aa"), categoryName: "Physics" }),
  mock({ _id: "mock-trending-5", code: "MKT501", title: "Marketing Management", categoryId: "680a1d73db33f7d83592943e", imageUrl: U("1460925895917-afdab827c52f"), categoryName: "Marketing" }),
];

export const MOCK_POPULAR = [
  mock({ _id: "mock-popular-1", code: "CS301", title: "Database Systems", categoryId: "680a1d2fdb33f7d83592942c", imageUrl: U("1532187863486-abf72db67f1e"), categoryName: "Computer Science/Information Technology" }),
  mock({ _id: "mock-popular-2", code: "ECO401", title: "Economics", categoryId: "680a1d3edb33f7d83592942f", imageUrl: U("1611974789850-c8a0edd7b3e2"), categoryName: "Economics" }),
  mock({ _id: "mock-popular-3", code: "LAW301", title: "Business Law", categoryId: "680a1d5fdb33f7d835929438", imageUrl: U("1589829545856-d10d557cf95f"), categoryName: "Law" }),
  mock({ _id: "mock-popular-4", code: "SOC101", title: "Introduction to Sociology", categoryId: "680a1dfddb33f7d835929456", imageUrl: U("1529156069898-49953e39b3ac"), categoryName: "Sociology" }),
  mock({ _id: "mock-popular-5", code: "BIO101", title: "Introduction to Biology", categoryId: "680a1e03db33f7d835929459", imageUrl: U("1564349683136-77e3d7167ad7"), categoryName: "Zoology" }),
];

export const MOCK_HOT_NEW = [
  mock({ _id: "mock-hot-1", code: "CS405", title: "Artificial Intelligence Fundamentals", categoryId: "680a1d2fdb33f7d83592942c", imageUrl: U("1498050108023-c5249f4df085"), categoryName: "Computer Science/Information Technology" }),
  mock({ _id: "mock-hot-2", code: "FIN501", title: "Financial Accounting", categoryId: "680a1bc4db33f7d835929422", imageUrl: U("1554224155-6726b3ff858f"), categoryName: "Accounting, Banking & Finance" }),
  mock({ _id: "mock-hot-3", code: "MCM301", title: "Mass Communication", categoryId: "680a1d83db33f7d835929441", imageUrl: U("1478737270239-2f02b77fc618"), categoryName: "Mass Communication" }),
];
