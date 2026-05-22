export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        {/* Concentric aurora arcs — rotate at three speeds. Pure CSS so this
            page works under reduced-motion (the arcs become a static ring). */}
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-violet-400 [animation-duration:1.4s]" />
          <div className="absolute inset-1 animate-spin rounded-full border-2 border-transparent border-t-blue-400 [animation-direction:reverse] [animation-duration:1.8s]" />
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-cyan-300 [animation-duration:2.4s]" />
        </div>

        <p className="font-mono text-label uppercase tracking-[0.2em] text-gray-500">
          loading
        </p>
      </div>
    </div>
  );
}
