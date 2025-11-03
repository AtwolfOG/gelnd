"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TextInput from "@/components/customInput";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const selectRef = useRef<HTMLSelectElement>(null);
  const [search, setSearch] = useState(searchParams.get("entry") || "");
  const [type, setType] = useState(searchParams.get("type") || "");

  // Debounce search text changes
  useEffect(() => {
    const id = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) params.set("entry", search);
      else params.delete("entry");

      if (type) params.set("type", type);
      else params.delete("type");

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(id);
  }, [search, type, pathname, router, searchParams]);

  //  Sync state when URL changes (e.g. back/forward navigation)
  useEffect(() => {
    setSearch(searchParams.get("entry") || "");
    const urlType = searchParams.get("type");
    if (urlType) {
      setType(urlType);
      if (selectRef.current) selectRef.current.value = urlType;
    }
  }, [searchParams]);

  return (
    <div className="flex gap-4 items-center flex-wrap">
      <TextInput
        placeholder="Search..."
        className="max-w-75"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <select
        ref={selectRef}
        className="border rounded px-2 py-2 border-(--border-muted) outline-none bg(--bg-dark) text-(--text-light)"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">You can select a type</option>
        <option value="bible">Bible</option>
        <option value="prayer">Prayer</option>
      </select>
    </div>
  );
}
