import { Accent } from "@/components/accenttext";
import Container from "@/components/container";
import { getNote } from "@/lib/session";

export default async function Notes() {
  const notes = await getNote();
  return (
    <div className="flex flex-col gap-4 mt-8 max-w-[1000px] w-[90%] lg:w-[80%]">
      <h2>Notes</h2>
      {notes.map(({ title, text, tags, createdAt }, i) => (
        <Note
          key={i}
          title={title}
          text={text}
          tags={tags}
          createdAt={createdAt}
        />
      ))}
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
