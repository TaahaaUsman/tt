import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaExclamation,
  FaCalendarCheck,
  FaSave,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import { MdQuiz, MdVolumeUp, MdExpandMore, MdExpandLess } from "react-icons/md";
import useIsMobile from "../utils/useIsMobile";
import { useSelector } from "react-redux";
import { apiFetch } from "../query/client";

const bg = "/assets/Images/bg.jpg";

export default function QuizPage({ quiz, courseDetails, courseId, type, paperId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [course, setCourse] = useState(courseDetails);
  const [showSummary, setShowSummary] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [showConceptPanel, setShowConceptPanel] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const isMobile = useIsMobile();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setChatMessages([]);
  }, [currentIndex]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const speakText = (text) => {
    if (!text || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  };

  const handleConceptChatSend = async () => {
    const msg = chatInput.trim();
    if (!msg || chatLoading) return;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: msg }]);
    setChatLoading(true);
    try {
      const res = await apiFetch("/api/quiz/conceptChat", {
        method: "POST",
        body: JSON.stringify({
          questionText: currentQuestion?.questionText,
          referenceParagraph,
          userMessage: msg,
        }),
      });
      const data = await res.json();
      const reply = data?.reply || "Sorry, I couldn't generate a reply.";
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    if (quiz?.length > 0) setQuestions(quiz);
  }, [quiz]);

  const currentQuestion = questions[currentIndex];
  const referenceParagraph = currentQuestion?.referenceParagraph || "";

  useEffect(() => {
    if (courseDetails) setCourse(courseDetails);
  }, [courseDetails]);

  useEffect(() => {
    if (questions?.length) setAnswers(Array(questions.length).fill(null));
  }, [questions?.length]);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
    setSubmissionStatus(null);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;
    if (selectedOption !== questions[currentIndex].correctOptionIndex) setSubmissionStatus("incorrect");
    else {
      setSubmissionStatus("correct");
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedOption;
    setAnswers(newAnswers);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setSubmissionStatus(null);
    } else setShowResult(true);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmissionStatus(null);
    setScore(0);
    setShowResult(false);
  };

  const handleSubmitBackend = async () => {
    try {
      const isPastPaper = type === "pastpaper" && paperId;
      const url = isPastPaper ? "/api/pastpaper/answerSubmit" : "/api/quiz/answerSubmit";
      const body = isPastPaper
        ? { courseId, paperId, attemptedAnswers: answers }
        : { courseId, type, attemptedAnswers: answers };
      const res = await apiFetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok && data) console.log(data);
    } catch (err) {
      console.error("Submit failed");
    }
  };

  if (!questions?.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white text-gray-700 px-4">
        <MdQuiz size={100} className="text-blue-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-center">No Questions Available</h1>
        <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
          This course doesn&apos;t have any MCQs added yet. Please check back later.
        </p>
        <Link to={`/courses/${courseId}`} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 shadow-md">
          Back to Course
        </Link>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg mb-4">Your Score: {score} / {questions.length}</p>
        <button onClick={handleRestart} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Restart
        </button>
      </div>
    );
  }

  const date = new Date();
  const formatTime = (d) => {
    let h = d.getHours();
    const m = d.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m < 10 ? "0" + m : m} ${ampm}`;
  };

  const handleFirst = () => { setCurrentIndex(0); setSelectedOption(null); setSubmissionStatus(null); };
  const handleLast = () => { setCurrentIndex(questions.length - 1); setSelectedOption(null); setSubmissionStatus(null); };
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setSubmissionStatus(null);
    }
  };
  const totalQuestions = questions.length;
  const attempted = answers.filter((a) => a !== null).length;
  const progressPercentage = totalQuestions ? (attempted / totalQuestions) * 100 : 0;
  const handleSwitchQuestion = (idx) => {
    setCurrentIndex(idx);
    setSelectedOption(answers[idx]);
    setSubmissionStatus(null);
  };
  const handleFinishPractice = () => {
    setShowSummary(true);
    handleSubmitBackend();
  };

  return (
    <div className="h-screen m-0 p-0 bg-gray-200">
      <div className="hidden absolute h-28 w-24 top-2 right-4 sm:right-10 z-10 bg-gray-500 rounded-full md:flex items-center justify-center cursor-pointer overflow-hidden">
        <img src={user?.profilePictureUrl || "/assets/Images/vu.png"} alt="User" className="object-cover w-full h-full" />
      </div>

      <nav className="w-full h-[10%] px-2 pr-40 bg-[#212529] text-white font-semibold mb-2 flex justify-between items-center">
        <span className="text-sm sm:text-base">
          <Link to={`/courses/${courseId}`}>
            {course?.code} (<span className="underline hover:text-blue-500">{course?.title}</span>)
          </Link>
        </span>
        <div className="hidden md:block">
          <span>Login Time {formatTime(date)}</span>
          <span className="ml-8">Guest</span>
        </div>
      </nav>

      <div className="w-full h-[75%] md:h-[78%] flex gap-1 flex-col md:flex-row">
        <div className={`w-full h-full ${showSummary ? "w-[83%]" : "w-full"} flex flex-col`}>
          <div className="h-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
            <div className="h-full bg-purple-700/40">
              <div className="h-[20%] flex justify-between items-center py-1 md:py-2 xl:py-4 pr-2 sm:pr-20 md:pr-36">
                <p className="text-white text-base sm:text-lg font-semibold pl-2">
                  Question No : {currentIndex + 1} of {questions.length}
                </p>
                <div className="flex items-center space-x-2 font-semibold">
                  <p className="text-xs sm:text-sm text-white">
                    Marks: <span className="text-[#00c5dc]">1</span> (Time <span className="text-[#00c5dc]">1 Min</span>)
                  </p>
                  <div className="hidden md:block">
                    <span className="cursor-pointer w-10 h-10 bg-[#ffb822] rounded-full flex items-center justify-center">
                      <FaExclamation style={{ fontSize: "1.4rem", color: "white" }} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[60%] bg-white p-1 w-full shadow-md">
                <textarea className="font-bold w-full h-full outline-none border-2 border-gray-200 p-2" readOnly value={currentQuestion?.questionText} />
              </div>
              <div>
                <p className="h-[20%] text-white text-base sm:text-lg font-semibold px-2 py-1 md:py-2 xl:py-4">Answer</p>
              </div>
            </div>
          </div>

          <div className="h-1/2 p-7 lg:py-7 xl:py-8 bg-white text-[17px] shadow-md overflow-y-auto">
            {currentQuestion?.options?.map((option, index) => {
              let bgColor = "";
              if (submissionStatus === "incorrect" && index === selectedOption) bgColor = "bg-red-300";
              else if (submissionStatus === "correct" && index === selectedOption) bgColor = "bg-green-300";
              else if (index === selectedOption) bgColor = "bg-blue-300";
              return (
                <div
                  key={index}
                  onClick={() => handleOptionChange(index)}
                  className={`p-2 lg:py-3 xl:py-4 border border-gray-200 rounded-md mb-2 cursor-pointer ${bgColor}`}
                >
                  {option}
                </div>
              );
            })}

            {/* Reading material & Chat */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={() => setShowConceptPanel(!showConceptPanel)}
                className="flex items-center gap-2 text-gray-800 font-semibold mb-2"
              >
                {showConceptPanel ? <MdExpandLess size={22} /> : <MdExpandMore size={22} />}
                Reading material & Chat (concept for this MCQ)
              </button>
              {showConceptPanel && (
                <div className="space-y-3">
                  {referenceParagraph && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-gray-800">
                      <p className="font-medium text-amber-900 mb-1">📖 Paragraph related to this question:</p>
                      <p className="whitespace-pre-wrap">{referenceParagraph}</p>
                    </div>
                  )}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="font-medium text-gray-700 mb-2 text-sm">💬 Ask AI about this concept:</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto mb-2">
                      {chatMessages.map((m, i) => (
                        <div
                          key={i}
                          className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
                              m.role === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-800"
                            }`}
                          >
                            {m.content}
                            {m.role === "assistant" && (
                              <button
                                type="button"
                                onClick={() => speakText(m.content)}
                                className="mt-1 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                                title="Listen"
                              >
                                <MdVolumeUp size={14} /> Listen
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {chatLoading && (
                        <p className="text-sm text-gray-500">AI is typing...</p>
                      )}
                      <div ref={chatEndRef} />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleConceptChatSend()}
                        placeholder="Ask about this concept..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleConceptChatSend}
                        disabled={chatLoading}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block h-full">
          <div className="absolute right-0 top-80 z-10">
            <button onClick={() => setShowSummary(!showSummary)} className="bg-purple-700/80 text-white px-4 py-4 rounded-l-md flex items-center gap-1 cursor-pointer">
              {showSummary ? <FaAngleDoubleRight style={{ fontSize: "1rem", color: "white" }} /> : <FaAngleDoubleLeft style={{ fontSize: "1rem", color: "white" }} />}
            </button>
          </div>
          <div className={`relative h-full bg-gray-100 ${showSummary ? "block" : "hidden"}`}>
            <div className="bg-cover bg-center h-auto p-3 pb-4" style={{ backgroundImage: `url(${bg})` }}>
              <p className="text-white text-lg font-semibold">Summary</p>
            </div>
            <div className="p-2" style={{ maxHeight: "300px", overflowY: "auto" }}>
              <div className="grid grid-cols-6 gap-4">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handleSwitchQuestion(index)}
                    className={`cursor-pointer w-6 h-6 rounded-xl flex items-center justify-center text-sm font-semibold ${
                      answers[index] !== null
                        ? answers[index] === questions[index].correctOptionIndex
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 w-full p-4 bg-white">
              <div className="flex items-center justify-between">
                <span>Attempted: {attempted}</span>
                <span>Total: {totalQuestions}</span>
              </div>
              <div className="mt-2">
                <progress className="w-full" value={attempted} max={totalQuestions} />
                <div className="text-center mt-1">{progressPercentage.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobile ? (
        <div className="h-[13%] text-sm">
          <div className="w-full h-full bg-gray-200">
            <div className="h-full flex flex-col justify-evenly items-center px-4">
              <div className="flex flex-row w-full">
                <button onClick={handlePrevious} className="bg-[#c19026d5] text-black py-2 w-1/2 rounded-l-md border-r border-black flex items-center justify-center gap-1">
                  <FaAngleLeft style={{ fontSize: "1rem", color: "black" }} />
                  <span>Previous</span>
                </button>
                <button onClick={handleNext} className="bg-[#c19028d5] border-l rounded-r-md text-black py-2 w-1/2 flex items-center justify-center gap-1">
                  <span>Next</span>
                  <FaAngleRight style={{ fontSize: "1rem", color: "black" }} />
                </button>
              </div>
              <div className="flex flex-row w-full">
                <Link to="/" className="bg-red-700 w-1/2 text-black px-4 py-3 rounded-l-md flex items-center justify-center">
                  Back to Courses
                </Link>
                <button onClick={() => { handleAnswerSubmit(); }} className="bg-[#34bfa3cd] w-1/2 border-l border-black rounded-r-md text-white px-4 py-2 flex items-center justify-center gap-1">
                  <FaSave style={{ fontSize: "1rem", color: "white" }} />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[13%] md:h-[10%] text-sm">
          <div className="w-full h-full px-2 bg-gray-200">
            <div className="h-full flex flex-col md:flex-row justify-between items-center px-4 md:px-0">
              <div className="flex flex-row gap-2 sm:gap-4 w-full md:w-auto">
                <button onClick={handleFinishPractice} className="bg-red-700 text-black cursor-pointer px-4 py-3 rounded-md flex items-center justify-center gap-1">
                  <FaCalendarCheck style={{ fontSize: "1rem", color: "black" }} />
                  <span className="text-base">Finish Practice</span>
                </button>
                <Link to="/" className="bg-[#34bfa3cd] text-black px-4 py-3 rounded-md flex items-center justify-center gap-1">
                  Back to Courses
                </Link>
              </div>
              <div className="mt-0 flex flex-row gap-4 w-auto">
                <div className="flex">
                  <button onClick={handleFirst} className="bg-[#c19026d5] text-black py-3 w-24 rounded-l-md border-r border-black flex items-center justify-center gap-1">
                    <FaAngleLeft style={{ fontSize: "1rem", color: "black" }} />
                    <span>First</span>
                  </button>
                  <button onClick={handleLast} className="bg-[#c19028d5] text-black py-3 w-24 rounded-r-md border-l border-black flex items-center justify-center gap-1">
                    <span>Last</span>
                    <FaAngleRight style={{ fontSize: "1rem", color: "black" }} />
                  </button>
                </div>
                <div className="flex">
                  <button onClick={handlePrevious} className="bg-[#c19026d5] text-black py-3 w-24 rounded-l-md border-r border-black flex items-center justify-center gap-1">
                    <FaAngleLeft style={{ fontSize: "1rem", color: "black" }} />
                    <span>Previous</span>
                  </button>
                  <button onClick={handleNext} className="bg-[#c19028d5] border-l rounded-r-md text-black py-3 w-24 border-black flex items-center justify-center gap-1">
                    <span>Next</span>
                    <FaAngleRight style={{ fontSize: "1rem", color: "black" }} />
                  </button>
                  <button onClick={() => { handleAnswerSubmit(); }} className="bg-[#34bfa3cd] rounded-md ml-4 text-white px-4 py-3 flex items-center justify-center gap-1">
                    <FaSave style={{ fontSize: "1rem", color: "white" }} />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
