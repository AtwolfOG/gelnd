import Container from "@/components/container";
import { getTimeSpent } from "@/lib/session";

function getTime(time: number) {
  const minutes = Math.floor((time % 3600000) / 60000);
  const hours = Math.floor(time / (1000 * 60 * 60));
  return hours ? `${hours}hr ${minutes}m` : `${minutes}m`;
}

export default async function TimeSpent() {
  const aggregate = await getTimeSpent();
  console.log(aggregate);
  const { bible, prayer } = aggregate.reduce((acc, val) => {
    acc[val._id] = val.time;
    return acc;
  }, {});
  console.log(bible, prayer);
  const bibleFormat = getTime(bible);
  const prayerFormat = getTime(prayer || 0);
  const totalFormat = getTime(bible + (prayer || 0));
  return (
    <Container>
      <div className="p-2">
        <h3>Today&apos;s Summary</h3>
        <div className="flex flex-wrap justify-between mt-4 max-w-[750px] ">
          <div>
            <h4>Bible Study</h4>
            <p>{bibleFormat}</p>
          </div>
          <div>
            <h4>Prayer Time</h4>
            <p>{prayerFormat}</p>
          </div>
          <div>
            <h4>Total Time</h4>
            <p>{totalFormat}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
