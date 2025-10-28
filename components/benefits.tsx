import { CiHeart } from "react-icons/ci";
import { cardDataType } from "./guide";

const cardData: cardDataType[] = [
  {
    title: "Develop Consistent Habits",
    text: "Visual streaks and progress tracking encourage daily devotional practice",
  },
  {
    title: "Remember God's Faithfulness",
    text: "Look back on answered prayers and spiritual breakthroughs",
  },
  {
    title: "Stay Accountable",
    text: "Clear data helps you maintain spiritual disciplines even when motivation wanes",
  },
];
function List({ title, text }: cardDataType) {
  return (
    <li className="list-disc marker:text-(--border-muted) marker:text-2xl">
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </li>
  );
}

export default function Benefits() {
  return (
    <div
      id="benefits"
      className="flex justify-center flex-wrap gap-10 gap-y-20 my-10 py-20 px-1"
    >
      <div className="flex flex-col gap-5 pl-5 max-w-[400px] ">
        <div>
          <CiHeart className="text-(--border-muted) text-6xl" />
        </div>
        <h1>Build a Deeper Relationship with God</h1>
        <p>
          When we measure something, we tend to improve it. By tracking your
          spiritual disciplines, you&apos;ll naturally become more intentional
          about spending quality time with God.
        </p>
        <div className="ml-6">
          <ul className="flex flex-col gap-2">
            {cardData.map(({ title, text }, i) => (
              <List key={i} title={title} text={text} />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 text-center max-w-[400px] bg-(--bg-dark) rounded px-5 py-10">
        <div className="text-7xl">📖</div>
        <p className="text-(--border-muted)!">
          &quot;But his delight is in the law of the Lord, and on his law he
          meditates day and night.&quot;
        </p>
        <p className="text-(--accent-color)!">Psalm 1:2</p>
      </div>
    </div>
  );
}
