import Container from "@/components/container";
import { getRecent } from "@/lib/recent";
import Link from "next/link";
import { PiBookOpenThin } from "react-icons/pi";

interface recentType {
  createdAt: string;
  entry: string;
  type: string;
  _id: string;
}

export default async function Recent() {
  const recent: recentType[] = await getRecent();
  if (!(recent.length > 0)) return;
  return (
    <Container className="my-12">
      <Link
        href={"/user/session"}
        className="underline underline-offset-1 decoration-(--text)"
      >
        <p className="text-right">view all</p>
      </Link>
      <div className="flex flex-col gap-3 p-2 md:p-4">
        {recent.map(({ createdAt, entry, type, _id }, index) => {
          const date = new Date(createdAt).toLocaleString();
          return (
            <div key={index}>
              <Link href={`session/${_id}`}>
                <Container className="flex items-center gap-3 hover:bg-(--bg-dark) duration-200 ">
                  <PiBookOpenThin className="inline text-(--border-muted) self-start text-2xl my-2" />
                  <div>
                    <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    <p>{entry.charAt(0).toUpperCase() + entry.slice(1)}</p>
                    <p className="mt-2 text-sm!">{date}</p>
                  </div>
                </Container>
              </Link>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
