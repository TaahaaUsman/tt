/**
 * Reusable section wrapper for consistent structure across Home and other pages.
 */
export default function SectionBlock({ title, action, children, className = "" }) {
  const showHeader = title || action;
  return (
    <section className={`mb-12 md:mb-16 ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          {title && (
            <div className="relative">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-indigo-600 rounded-full" />
            </div>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

