import { Accent } from "@/components/accenttext";
import Container from "@/components/container";
import { getSessionNotes } from "@/lib/getSession";

interface noteType {
  text: string;
  user: string;
  title: string;
  tags: string[];
  createdAt: string;
  activity: string;
}

interface activityType {
  createdAt: string;
  entry: string;
  type: string;
  time: number;
  notes: Array<noteType>;
  _id: string;
}
function getTime(time: number) {
  const minutes = Math.floor((time % 3600000) / 60000);
  const hours = Math.floor(time / (1000 * 60 * 60));
  return hours ? `${hours}hr ${minutes}m` : `${minutes}m`;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity: activityType = await getSessionNotes(id);
  const date = new Date(activity.createdAt).toLocaleDateString();
  return (
    <div>
      <div>
        <div>
          <h1>{activity.entry}</h1>
          <p>{date}</p>
        </div>
        <p>{getTime(activity.time)}</p>
      </div>
      <div className="flex flex-col gap-4 mt-8 max-w-[1000px] w-[90%] lg:w-[80%]">
        <h2>Notes</h2>
        {activity.notes.map(({ title, text, tags, createdAt }, i) => (
          <Note
            key={i}
            title={title}
            text={text}
            tags={tags}
            createdAt={createdAt}
          />
        ))}
      </div>
    </div>
  );
}

function Note({
  title,
  text,
  tags,
  createdAt,
}: {
  title: string;
  text: string;
  tags: string[];
  createdAt: string;
}) {
  return (
    <Container>
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
