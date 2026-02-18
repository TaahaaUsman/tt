import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { useUnbookmarkMutation } from "../query/queries";
import { category } from "../data/categorie";
import { MOCK_SUGGESTED, MOCK_TRENDING, MOCK_POPULAR, MOCK_HOT_NEW } from "../data/mockDiscover";
import CourseCard from "./CourseCard";
import SectionBlock from "./SectionBlock";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function HomePage({ bookmarkedCourses = [] }) {
  const user = useSelector((state) => state.auth.user);
  const unbookmarkMutation = useUnbookmarkMutation();

  const unBookMark = async (courseId, code) => {
    try {
      await unbookmarkMutation.mutateAsync(courseId);
      toast.success(`${code} removed from bookmarks`);
    } catch (err) {
      console.error("Unbookmark failed");
    }
  };

  const viewAllLink = (label = "View all", to = "/courses") => (
    <Link to={to} className="group/link flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest">
      {label}
      <motion.span
        initial={{ x: 0 }}
        whileHover={{ x: 3 }}
        className="inline-block"
      >
        →
      </motion.span>
    </Link>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fdfdfd]">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 pt-8 pb-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto relative rounded-[2.5rem] bg-indigo-600 overflow-hidden shadow-2xl shadow-indigo-200"
        >
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[100px]" />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
                {user ? "Your Personal Learning Space" : "The Future of Learning"}
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
                {user?.name ? (
                  <>Ready to scale your <br /><span className="text-indigo-200">knowledge, {user.name.split(' ')[0]}?</span></>
                ) : (
                  <>Master any subject <br /><span className="text-indigo-200">effortlessly.</span></>
                )}
              </h1>

              <p className="text-indigo-100/80 max-w-xl text-lg md:text-xl font-medium leading-relaxed mb-10">
                Access premium notes, interactive quizzes, and visual mind maps to accelerate your growth.
                {user ? " Pick up right where you left off." : " Join thousands of students today."}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/courses"
                  className="px-8 py-4 rounded-2xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-all shadow-xl shadow-black/10 hover:shadow-white/20 active:scale-95"
                >
                  Explore Library
                </Link>
                {!user && (
                  <Link
                    to="/auth/register"
                    className="px-8 py-4 rounded-2xl bg-indigo-500/50 text-white font-bold backdrop-blur-md border border-white/20 hover:bg-indigo-500/70 transition-all active:scale-95"
                  >
                    Join Buddy
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="px-4 md:px-8 pb-20 max-w-7xl mx-auto space-y-20"
      >
        {/* Sign-in Banner (Premiumized) */}
        {!user && (
          <motion.section variants={itemVariants}>
            <div className="rounded-[2rem] bg-gray-50 border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-700" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-2xl font-black text-gray-900 mb-3">Your learning, synced everywhere.</h2>
                <p className="text-gray-500 font-medium mb-8">Save your progress, bookmark favorite courses, and get personalized recommendations.</p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/auth/login"
                    className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-gray-700 font-bold border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 hover:shadow-lg transition-all"
                  >
                    <FcGoogle className="text-xl" />
                    Google Account
                  </Link>
                  <Link
                    to="/auth/register"
                    className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Premium Badge / Upgrade CTA */}
        {user && (
          <motion.section variants={itemVariants}>
            {(user.plan === "pro" || user.plan === "ultra_pro") ? (
              <div className="rounded-[2rem] bg-gradient-to-br from-amber-400 to-orange-500 p-1">
                <div className="bg-white rounded-[1.9rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-center md:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shadow-inner">
                      ✨
                    </div>
                    <div>
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider">
                          {user.plan === "ultra_pro" ? "Ultra Pro" : "Pro"}
                        </span>
                        <h3 className="font-black text-gray-900">Member Status</h3>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">
                        You're currently enjoying unlimited access to all courses, mind maps, and quizzes.
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/analytics"
                    className="shrink-0 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-all"
                  >
                    View Analytics
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                to="/pricing"
                className="block group rounded-[2rem] bg-indigo-50 border border-indigo-100 p-8 relative overflow-hidden active:scale-[0.98] transition-all"
              >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-black text-indigo-900 group-hover:text-indigo-600 transition-colors">Go Unlimited with Pro</h3>
                    <p className="text-indigo-600/70 font-medium mt-1">Unlock over 500+ past papers, premium notes, and visual mind maps.</p>
                  </div>
                  <div className="shrink-0 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 group-hover:bg-indigo-700 transition-all flex items-center gap-2">
                    Get Started <FiArrowRight />
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl" />
              </Link>
            )}
          </motion.section>
        )}

        {/* Discovery Sections */}
        <div className="space-y-24">
          <motion.div variants={itemVariants}>
            <SectionBlock title="Suggested for you" action={viewAllLink("See all")}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_SUGGESTED.map((course, index) => (
                  <CourseCard key={course._id} course={course} index={index} />
                ))}
              </div>
            </SectionBlock>
          </motion.div>

          <motion.div variants={itemVariants}>
            <SectionBlock title="Trending Now" action={viewAllLink("Browse Library")}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_TRENDING.map((course, index) => (
                  <CourseCard key={course._id} course={course} index={index} />
                ))}
              </div>
            </SectionBlock>
          </motion.div>

          {/* Featured Layout */}
          <motion.div variants={itemVariants}>
            <SectionBlock title="Hot new releases" action={viewAllLink("Explore New")}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {MOCK_HOT_NEW.map((course, index) => (
                  <CourseCard key={course._id} course={course} index={index} />
                ))}
              </div>
            </SectionBlock>
          </motion.div>

          <motion.div variants={itemVariants}>
            <SectionBlock title="Top Rated" action={viewAllLink("View All")}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_POPULAR.map((course, index) => (
                  <CourseCard key={course._id} course={course} index={index} />
                ))}
              </div>
            </SectionBlock>
          </motion.div>
        </div>

        {/* Learning Library Section */}
        <motion.div variants={itemVariants}>
          <div className="bg-gray-50/50 rounded-[3rem] p-8 md:p-12 border border-gray-100">
            <SectionBlock title="My Library">
              {bookmarkedCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-6">
                  <div className="w-24 h-24 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6 text-4xl shadow-inner animate-bounce">
                    📚
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Build your knowledge base</h3>
                  <p className="text-gray-500 text-center max-w-sm mb-8 font-medium italic">
                    {user
                      ? "Your library is currently empty. Start adding courses to keep track of your progress."
                      : "Create an account to save courses, take quizzes, and track your learning journey."}
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center">
                    {user ? (
                      <Link
                        to="/courses"
                        className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
                      >
                        Find Courses
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/auth/login"
                          className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/courses"
                          className="px-8 py-3.5 rounded-2xl bg-white text-gray-700 font-bold border border-gray-200 hover:border-indigo-600 transition-all shadow-sm"
                        >
                          Browse Library
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bookmarkedCourses.map((course, index) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      variant="bookmarked"
                      onUnbookmark={unBookMark}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </SectionBlock>
          </div>
        </motion.div>

        {/* Category Exploration Grid */}
        <motion.div variants={itemVariants}>
          <SectionBlock title="Knowledge Paths">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {category.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/courses?category=${cat._id}`}
                  className="group p-6 rounded-[2rem] bg-white border border-gray-100 hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 text-center flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    {cat.name.charAt(0)}
                  </div>
                  <span className="text-xs font-black text-gray-700 group-hover:text-indigo-600 transition-colors uppercase tracking-widest whitespace-nowrap">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </SectionBlock>
        </motion.div>
      </motion.div>
    </div>
  );
}

