import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-100 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin" />
      </div>
      <div className="mt-6 flex items-center gap-1">
        {"Buddy Loading".split("").map((char, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: idx * 0.05,
            }}
            className="text-gray-900 text-sm font-black uppercase tracking-widest"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

