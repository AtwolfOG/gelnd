import { getNotes } from "@/lib/journal";
import { Accent } from "@/components/accenttext";
import Container from "@/components/container";
import Search from "./search";
import type { Metadata } from "next";
import Link from "next/link";
import type { Types } from "mongoose";

export const metadata: Metadata = {
  title: "Journey",
  description: "Document your journey through out your progress",
};

export default async function NoteComponent({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query = "" } = await searchParams;
  const notes = await getNotes(query);
  return (
    <div>
      <Search />
      <Notes notes={notes} />
    </div>
  );
}

async function Notes({
  notes,
}: {
  notes: {
    title: string;
    text: string;
    tags: string[];
    createdAt: string;
    activity?: Types.ObjectId;
  }[];
}) {
  return (
    <>
      {notes.length > 0 ? (
        <Container className="my-12 m-auto max-w-[800px] w-[90%] md:w-[80%]">
          <div className="flex flex-col gap-4 mt-8 ">
            <h2>Notes</h2>
            {notes.map(({ title, text, tags, createdAt, activity }, i) => (
              <Note
                key={i}
                title={title}
                text={text}
                tags={tags}
                createdAt={createdAt}
                activity={activity}
              />
            ))}
          </div>
        </Container>
      ) : (
        <h3 className="my-10 mx-auto w-max">No note found</h3>
      )}
    </>
  );
}
function Note({
  title,
  text,
  tags,
  createdAt,
  activity,
}: {
  title: string;
  text: string;
  tags: string[];
  createdAt: string;
  activity?: Types.ObjectId;
}) {
  const activityString = activity?.toString();
  return (
    <Container className="flex flex-wrap justify-between">
      <div>
        <div className="mt-2 mb-5">
          <h2 className="">{title}</h2>
          <p className="line-clamp-3 text-ellipsis">{text}</p>
          <div className="flex gap-2">
            {tags?.length > 0 &&
              tags.map((text, i) => <Tag key={i} text={text} />)}
          </div>
        </div>
        <p className="text-sm!">{new Date(createdAt).toLocaleString()}</p>
      </div>
      {activity && (
        <Link
          className="text-(--text-light) underline decoration-(--text-light) underline-offset-1 my-2"
          href={`/user/session/${activityString}`}
        >
          Go to Session
        </Link>
      )}
    </Container>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <div className="w-max bg-(--border-light) text-(--border-muted) p-0.5 px-2 rounded-2xl">
      <Accent>{text}</Accent>
    </div>
  );
}
