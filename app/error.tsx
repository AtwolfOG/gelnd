"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="m-auto flex flex-col justify-center items-center gap-2">
      <p>Something went wrong?</p>
      <button
        className="p-2 border border-(--border-light) bg-(--bg-light) hover:bg-(--border-light) rounded-md m-auto"
        onClick={() => reset()}
      >
        retry
      </button>
    </div>
  );
}
