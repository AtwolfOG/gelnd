import Container from "@/components/container";
import Link from "next/link";
import { PiBookOpenThin } from "react-icons/pi";
import Search from "./search";
import { getSession } from "@/lib/getSession";
import { Suspense } from "react";
import { Loader } from "@/components/loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session",
  description: "List of all sessions",
};

function getTime(time: number) {
  const minutes = Math.floor((time % 3600000) / 60000);
  const hours = Math.floor(time / (1000 * 60 * 60));
  return hours ? `${hours}hr ${minutes}m` : `${minutes}m`;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ type: string; entry: string }>;
}) {
  const { type = "", entry = "" } = await searchParams;

  const activities = await getSession(type, entry);
  return (
    <div>
      <Search />
      <Suspense fallback={<Loader width={35} height={4} />}>
        <Activities activities={activities} />
      </Suspense>
    </div>
  );
}

interface activityType {
  createdAt: string;
  entry: string;
  type: string;
  time: number;
  _id: string;
}

async function Activities({ activities }: { activities: activityType[] }) {
  return (
    <>
      {activities.length > 0 ? (
        <Container className="my-12 m-auto max-w-[1000px] w-[90%] lg:w-[80%]">
          <div className="flex flex-col gap-3 p-4">
            {activities.map(({ createdAt, entry, type, _id, time }, index) => {
              const date = new Date(createdAt).toLocaleString();
              return (
                <div key={index}>
                  <Link href={`session/${_id}`}>
                    <Container className="flex justify-between hover:bg-(--bg-dark) duration-200 ">
                      <div className="flex items-center gap-3 ">
                        <PiBookOpenThin className="inline text-(--border-muted) self-start text-2xl my-2" />
                        <div>
                          <h3>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </h3>
                          <p>
                            {entry.charAt(0).toUpperCase() + entry.slice(1)}
                          </p>
                          <p className="mt-2 text-sm!">{date}</p>
                        </div>
                      </div>
                      <p className="mr-3">{getTime(time)}</p>
                    </Container>
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      ) : (
        <h3 className="my-10 mx-auto w-max">No session found</h3>
      )}
    </>
  );
}
