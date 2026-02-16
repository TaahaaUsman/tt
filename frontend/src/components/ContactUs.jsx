import { useState, useRef } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUploadMutation } from "../query/queries";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dq0gmxpcn";
const uploadPreset = "uploadfiles";

export default function ContactUsPage() {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const uploadMutation = useUploadMutation();
  const loading = uploadMutation.isPending;

  const notify = (message, isError = false) => {
    if (isError) toast.error(message);
    else toast.success(message);
  };

  const openCloudinaryWidget = () => {
    if (typeof window === "undefined" || !window.cloudinary) {
      notify("Cloudinary widget is loading. Try again in a moment.", true);
      return;
    }
    window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        multiple: true,
      },
      (error, result) => {
        if (error) return;
        if (result.event === "success" && result.info?.secure_url) {
          setFiles((prev) => [...prev, result.info.secure_url]);
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length || !description.trim()) {
      notify("Please select files and write description.", true);
      return;
    }
    try {
      const json = await uploadMutation.mutateAsync({ uploadedFiles: files, description });
      if (json?.message) {
        notify(json.message);
        setResponse(json.message);
      } else {
        notify(json?.error || "Error", true);
        setResponse(json?.error || "Error");
      }
      setFiles([]);
      setDescription("");
    } catch (err) {
      console.error("Server upload error:", err);
      notify("Upload failed", true);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-6 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        {loading ? (
          <>
            <Skeleton height={30} width={150} className="mb-6" />
            <Skeleton height={44} className="mb-6" />
            <Skeleton height={20} width={100} className="mb-2" />
            <Skeleton height={100} className="mb-6" />
            <Skeleton height={44} />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

            <button
              type="button"
              onClick={openCloudinaryWidget}
              className="w-full cursor-pointer border border-gray-300 text-gray-500 rounded p-2 text-left mb-10"
            >
              📤 Upload Files
            </button>

            {files.length > 0 && (
              <div className="text-green-600 mt-2 mb-4 font-medium">
                ✅ Files added successfully. Now type a description and submit!
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                className="w-full border border-gray-300 rounded p-2 resize-none"
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition"
            >
              {loading ? "Sending..." : "Submit"}
            </button>

            {response && (
              <div className="text-sm font-semibold text-gray-700 text-center mt-4">{response}</div>
            )}
          </>
        )}
      </form>
    </div>
  );
}
