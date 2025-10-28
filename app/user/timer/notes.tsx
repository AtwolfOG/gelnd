import { Accent } from "@/components/accenttext";
import Container from "@/components/container";
import { getNote } from "@/lib/session";

export default async function Notes() {
  const notes = await getNote();
  return (
    <div className="flex flex-wrap gap-3">
      {notes.map(({ title, text, tags }, i) => (
        <Note key={i} title={title} text={text} tags={tags} />
      ))}
    </div>
  );
}
function Note({
  title,
  text,
  tags,
}: {
  title: string;
  text: string;
  tags: string[];
}) {
  return (
    <div className=" flex w-[300px] h-[175px]">
      <Container>
        <div className="p-2">
          <h2 className="mb-4">{title}</h2>
          <div>
            <p className="line-clamp-3 text-ellipsis max-w-[270px]">{text}</p>
            <div className="flex gap-2">
              {tags?.length > 0 &&
                tags.map((text, i) => <Tag key={i} text={text} />)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <div className="w-max bg-(--border-light) text-(--border-muted) p-1 px-2 rounded-2xl">
      <Accent>{text}</Accent>
    </div>
  );
}
