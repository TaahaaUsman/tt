import { useState } from "react";
import toast from "react-hot-toast";
import { useUploadMutation } from "../query/queries";
import { motion } from "framer-motion";
import { FiUploadCloud, FiMail, FiMessageSquare, FiCheckCircle, FiSend } from "react-icons/fi";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dq0gmxpcn";
const uploadPreset = "uploadfiles";

export default function ContactUsPage() {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const uploadMutation = useUploadMutation();
  const loading = uploadMutation.isPending;

  const openCloudinaryWidget = () => {
    if (typeof window === "undefined" || !window.cloudinary) {
      toast.error("Widget is initializing. Please wait.");
      return;
    }
    window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        multiple: true,
        theme: "minimal",
        colors: {
          action: "#4f46e5",
          primary: "#111827",
        }
      },
      (error, result) => {
        if (error) return;
        if (result.event === "success" && result.info?.secure_url) {
          setFiles((prev) => [...prev, result.info.secure_url]);
          toast.success("File attached successfully!");
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length && !description.trim()) {
      toast.error("Please provide a description or attach a file.");
      return;
    }
    try {
      const json = await uploadMutation.mutateAsync({ uploadedFiles: files, description });
      if (json?.message) {
        toast.success("Your message has been received. We'll get back to you soon!");
        setResponse(json.message);
      } else {
        toast.error(json?.error || "Submission failed. Please try again.");
      }
      setFiles([]);
      setDescription("");
    } catch (err) {
      toast.error("Unable to send message. Please check your connection.");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#fdfdfd] flex items-center justify-center p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-gray-100"
      >
        {/* Left Side: Info & Aesthetic */}
        <div className="bg-indigo-600 p-12 md:p-16 text-white relative flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full -translate-x-1/3 translate-y-1/3 blur-2xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-8"
            >
              <FiMail size={24} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
              Let's talk about <br />your <span className="text-indigo-200">learning journey.</span>
            </h1>
            <p className="text-indigo-100 font-medium text-lg leading-relaxed max-w-md">
              Have a question about a course, pricing, or just want to say hi? Our team is always here to help you scale your knowledge.
            </p>
          </div>

          <div className="relative z-10 mt-12 space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-all duration-300">
                <FiMessageSquare size={18} />
              </div>
              <span className="font-bold">support@buddy.edu</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-all duration-300">
                <FiCheckCircle size={18} />
              </div>
              <span className="font-bold">Avg. response time: 2 hours</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-12 md:p-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-1">
                What's on your mind?
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="6"
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 rounded-3xl p-6 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-300 resize-none shadow-inner"
                placeholder="Type your message, query, or feedback here..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-1">
                Evidence or Attachments (Optional)
              </label>
              <button
                type="button"
                onClick={openCloudinaryWidget}
                className={`w-full group flex flex-col items-center justify-center gap-3 p-8 rounded-[2rem] border-2 border-dashed transition-all duration-300 ${files.length > 0
                    ? "border-green-200 bg-green-50/30 text-green-600"
                    : "border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50/30 text-gray-400 hover:text-indigo-600"
                  }`}
              >
                <FiUploadCloud size={32} className={files.length > 0 ? "animate-bounce" : "group-hover:scale-110 transition-transform"} />
                <span className="font-bold text-sm tracking-wide">
                  {files.length > 0 ? `${files.length} Files attached successfully` : "Upload Screenshots or PDF"}
                </span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-[1.75rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send Message <FiSend size={18} />
                </>
              )}
            </button>

            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-green-50 text-green-700 text-center text-xs font-bold uppercase tracking-wider"
              >
                ✓ Message Dispatched
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}

