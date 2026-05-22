export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Single accent hairline ring rotating like a film reel.
            CSS-only so this page works under reduced-motion (the ring becomes
            a static partial circle). */}
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent [animation-duration:1.4s]" />
          <div className="absolute inset-[6px] rounded-full border border-soft" />
        </div>

        <p className="font-mono text-label uppercase tracking-[0.3em] text-tertiary">
          rewinding
        </p>
      </div>
    </div>
  );
}
