import Container from "@/components/container";
import { IoMdTime } from "react-icons/io";
import { LuTrendingUp } from "react-icons/lu";
import { PiNotepadLight } from "react-icons/pi";

function getTime(time: number) {
  const minutes = Math.floor((time % 3600000) / 60000);
  const hours = Math.floor(time / (1000 * 60 * 60));
  return hours ? `${hours}hr ${minutes}m` : `${minutes}m`;
}
export default function Stats() {
  const num = 2;
  const time = 3660000;
  const timeFormat = getTime(time);

  return (
    <div className="flex flex-wrap gap-3 my-7">
      <Container>
        <div className="flex flex-col ">
          <div className="flex gap-3">
            <PiNotepadLight className="text-4xl bg-(--bg) rounded-lg text-(--border-light) p-1" />
            <div>
              <h4>Current Streak</h4>
              <p>{num + " Day" + (num > 1 ? "s" : "")}</p>
              <p className="mt-3">Keep going</p>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col ">
          <div className="flex gap-3">
            <IoMdTime className="text-4xl bg-(--bg) rounded-lg text-(--border-light) p-1" />
            <div>
              <h4>This week</h4>
              <p>{timeFormat}</p>
              <p className="mt-3">+23% from last week</p>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col ">
          <div className="flex gap-3">
            <LuTrendingUp className="text-4xl bg-(--bg) rounded-lg text-(--border-light) p-1" />
            <div>
              <h4>Current Streak</h4>
              <p>{num + " Day" + (num > 1 ? "s" : "")}</p>
              <p className="mt-3">All time tracking</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
