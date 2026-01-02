export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Simple spinner */}
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-white" />

        {/* Loading text */}
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
