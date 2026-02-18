/**
 * ChatGPT-style message: markdown, code highlighting, typing effect.
 */
import { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const TYPING_SPEED_MS = 10;

export function useTypingEffect(text, enabled) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!enabled || !text) {
      setDisplayed(text || "");
      return;
    }
    setDisplayed("");
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, TYPING_SPEED_MS);
    return () => clearInterval(t);
  }, [text, enabled]);
  return displayed;
}

export default function ChatMessageContent({ content, role, typingEffect = true, className = "" }) {
  const isAssistant = role === "assistant";
  const typedContent = useTypingEffect(isAssistant && typingEffect ? content : content, isAssistant && typingEffect);
  const showTyping = isAssistant && typingEffect && typedContent.length < (content?.length || 0);

  const markdownComponents = useMemo(
    () => ({
      code({ node, inline, className: codeClassName, children, ...props }) {
        const match = /language-(\w+)/.exec(codeClassName || "");
        return !inline && match ? (
          <SyntaxHighlighter
            style={oneDark}
            PreTag="div"
            language={match[1]}
            customStyle={{
              margin: "0.5rem 0",
              borderRadius: "0.5rem",
              fontSize: "0.8125rem",
              padding: "1rem",
            }}
            codeTagProps={{ style: { fontFamily: "ui-monospace, monospace" } }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 font-mono text-sm" {...props}>
            {children}
          </code>
        );
      },
      p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
      ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-0.5">{children}</ul>,
      ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-0.5">{children}</ol>,
      strong: ({ children }) => <strong className="font-semibold text-inherit">{children}</strong>,
      a: ({ href, children }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
          {children}
        </a>
      ),
      h1: ({ children }) => <h3 className="text-base font-bold mt-3 mb-1">{children}</h3>,
      h2: ({ children }) => <h3 className="text-sm font-bold mt-2 mb-1">{children}</h3>,
      h3: ({ children }) => <h3 className="text-sm font-semibold mt-2 mb-1">{children}</h3>,
    }),
    []
  );

  if (isAssistant) {
    return (
      <div className={`chat-message-content prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 ${className}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {typedContent}
        </ReactMarkdown>
        {showTyping && <span className="inline-block w-2 h-4 ml-0.5 bg-indigo-500 animate-pulse align-middle" aria-hidden />}
      </div>
    );
  }

  return <div className={`whitespace-pre-wrap break-words ${className}`}>{content}</div>;
}
