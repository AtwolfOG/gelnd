import Link from "next/link";

export default function NotFound() {
  return (
    <div className="m-auto flex flex-col justify-center items-center gap-2">
      <h1>Page not found</h1>
      <h1>404</h1>
      <Link href={"/user/dashboard"}>Go to Dashboard</Link>
    </div>
  );
}
