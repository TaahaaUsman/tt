import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useCourseDetailsQuery } from "../query/queries";
import CourseDetailsButton from "../components/CourseDetailsButton";
import ShortNotes from "../components/ShortNotes";
import PastPapersSection from "../components/PastPapersSection";
import SubjectiveQuestionsSection from "../components/SubjectiveQuestionsSection";
import Loader from "../components/Loader";
import { FiGrid, FiExternalLink, FiVideo, FiFileText, FiBookOpen, FiHelpCircle, FiClock } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Default intro video (Coursera-style) when course has none set. Path in public folder.
const DEFAULT_INTRO_VIDEO = "/What_is_Programming,_Really_.mp4";
const DEFAULT_INTRO_OVERVIEW =
  "This short introduction gives you an overview of the subject and what to expect in this course. Watch to understand the key concepts and how the course is structured.";

export default function CourseDetail() {
  const { id: courseId } = useParams();
  const { hash } = useLocation();
  const { data: course, isLoading } = useCourseDetailsQuery(courseId);

  useEffect(() => {
    if (hash === "#mindmap") {
      const el = document.getElementById("mindmap");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash, course]);

  if (isLoading) return <Loader />;
  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-400 mb-6">
          <FiHelpCircle size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Course not found</h2>
        <p className="text-gray-500 font-medium">The content you're looking for might have been moved or doesn't exist.</p>
      </div>
    );
  }

  const introVideoUrl = course.introVideoUrl || DEFAULT_INTRO_VIDEO;
  const introOverview = course.introOverview || course.description || DEFAULT_INTRO_OVERVIEW;

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-24"
    >
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-indigo-50/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] bg-purple-50/50 rounded-full blur-3xl" />
        </div>

        <div className="relative px-6 md:px-8 max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100/50 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              {course.code}
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
            {course.title}
          </motion.h1>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <FiClock className="text-indigo-600" /> Self-Paced
            </div>
            <div className="flex items-center gap-2">
              <FiVideo className="text-indigo-600" /> Video Intro
            </div>
            <div className="flex items-center gap-2">
              <FiBookOpen className="text-indigo-600" /> Premium Content
            </div>
          </motion.div>
        </div>
      </section>

      <div className="px-6 md:px-8 max-w-6xl mx-auto -mt-20 relative z-20">
        {/* Intro Section Card */}
        <motion.section
          variants={itemVariants}
          className="mb-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-10">
            <div className="lg:w-2/5 shrink-0 group">
              <div className="aspect-video rounded-[2rem] bg-gray-900 overflow-hidden shadow-2xl relative">
                <video
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  controls
                  preload="metadata"
                  src={introVideoUrl}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 pointer-events-none border-[6px] border-white/10 rounded-[2rem]" />
              </div>
            </div>
            <div className="lg:flex-1 py-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                <h3 className="text-2xl font-black text-gray-900">Course Overview</h3>
              </div>
              <p className="text-gray-500 font-medium leading-[1.8] whitespace-pre-line text-lg">
                {introOverview}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Short Notes Block */}
          <motion.div variants={itemVariants} className="lg:col-span-2 group">
            <div className="bg-white h-full p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-3xl bg-green-50 text-green-600 group-hover:scale-110 transition-transform duration-500">
                    <FiFileText size={28} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">Study Notes</h2>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  Complete Guide
                </span>
              </div>
              <ShortNotes courseCode={course?.code} courseId={course?._id} />
            </div>
          </motion.div>

          {/* Quiz Block */}
          <motion.div variants={itemVariants} className="group">
            <div className="bg-white h-full p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 hover:border-purple-100 transition-all duration-500">
              <div className="flex flex-col h-full">
                <div className="p-4 w-fit rounded-3xl bg-purple-50 text-purple-600 mb-8 group-hover:scale-110 transition-transform duration-500">
                  <FiHelpCircle size={28} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-4">Practice Quiz</h2>
                <p className="text-gray-500 font-medium mb-8 flex-1 italic">
                  "Test your knowledge with AI-driven quizzes tuned for your exams."
                </p>
                <CourseDetailsButton courseId={course._id} />
              </div>
            </div>
          </motion.div>

          {/* Past Papers Block */}
          <motion.div variants={itemVariants} className="group md:col-span-2 lg:col-span-1">
            <div className="bg-white h-full p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-amber-500/5 hover:border-amber-100 transition-all duration-500">
              <div className="p-4 w-fit rounded-3xl bg-amber-50 text-amber-600 mb-8 group-hover:scale-110 transition-transform duration-500">
                <FiClock size={28} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Past Papers</h2>
              <PastPapersSection courseId={course._id} />
            </div>
          </motion.div>

          {/* Mindmap Block */}
          <motion.div id="mindmap" variants={itemVariants} className="lg:col-span-2 group">
            <div className="bg-white h-full p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-cyan-500/5 hover:border-cyan-100 transition-all duration-500">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 rounded-3xl bg-cyan-50 text-cyan-600 group-hover:scale-110 transition-transform duration-500">
                      <FiGrid size={28} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Concept Mind Map</h2>
                  </div>
                  <p className="text-gray-500 font-medium mb-0">
                    Explore the complete subject roadmap and inter-topic relationships visually.
                  </p>
                </div>
                <a
                  href={`/courses/${courseId}/mindmap`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center justify-center gap-3 px-8 py-5 rounded-[1.75rem] bg-cyan-600 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-cyan-100 hover:bg-cyan-700 active:scale-95 transition-all"
                >
                  <FiExternalLink size={20} />
                  Launch Mind Map
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Questions Section */}
        <motion.div variants={itemVariants} className="mt-8 group">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-500">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 rounded-3xl bg-indigo-50 text-indigo-600 group-hover:rotate-12 transition-transform duration-500">
                <FiBookOpen size={28} />
              </div>
              <h2 className="text-2xl font-black text-gray-900">Subjective Question Bank</h2>
            </div>
            <SubjectiveQuestionsSection courseId={course._id} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

