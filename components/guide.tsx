export interface cardDataType {
  title: string;
  text: string;
}
interface cardType extends cardDataType {
  index: number;
}
const cardData: cardDataType[] = [
  {
    title: "Start a Session",
    text: "Begin a timer when you start your Bible study or prayer time. Focus on God without distraction.",
  },
  {
    title: "Document Insights",
    text: "Capture key revelations, prayers answered, and lessons learned during your time with God.",
  },
  {
    title: "Track Growth",
    text: "Review your analytics to see your spiritual growth over time and celebrate your progress.",
  },
];
function GuideCard({ title, index, text }: cardType) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mx-auto mb-3 bg-(--border-light) rounded-[50%] size-16">
        {index + 1}
      </div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default function Guide() {
  return (
    <section className="my-25 py-10 px-2 text-center">
      <h1>Simple, Intentional, Transformative</h1>
      <p>
        Three easy steps to start tracking, and deepening your spiritual journey
      </p>
      <div className="grid grid-cols-[repeat(_auto-fit,minmax(250px,300px))] justify-center max-w-[1000px] gap-4 gap-y-8 mt-10 mx-auto">
        {cardData.map(({ title, text }, index) => (
          <GuideCard key={index} title={title} text={text} index={index} />
        ))}
      </div>
    </section>
  );
}
