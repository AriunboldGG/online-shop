// Shape of a slug page while its URL-specific content streams in: the page sign, the rail,
// and the first row of the grid, outlined so the layout does not jump when content arrives.
export function PageFallback() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-6xl px-4 pb-16 pt-4 lg:pt-8">
      <div className="flood-soft h-44 rounded-[28px] border-[3px] border-ink lg:h-56" />
      <div className="mt-6 h-28 rounded-[28px] border-[3px] border-rule" />
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-5">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="aspect-[3/4] rounded-[22px] border-[3px] border-rule" />
        ))}
      </div>
    </div>
  );
}
