"use client";
import TextInput from "@/components/customInput";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("query", search);
      router.replace(`${pathname.toString()}?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, pathname, router, searchParams]);
  useEffect(() => {
    const query = searchParams.get("query");
    if (query) setSearch(query);
  }, [searchParams]);
  return (
    <TextInput
      placeholder="Search with title,text and tags.."
      className="max-w-75"
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    />
  );
}
