/**
 * Reusable section wrapper for consistent structure across Home and other pages.
 */
export default function SectionBlock({ title, action, children, className = "" }) {
  const showHeader = title || action;
  return (
    <section className={`mb-10 md:mb-12 ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between gap-4 mb-4">
          {title && (
            <h2 className="text-base font-semibold uppercase tracking-wider text-gray-500 border-b-2 border-blue-600 pb-1.5 inline-block">
              {title}
            </h2>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
