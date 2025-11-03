import Container from "@/components/container";
import { IoMdTime } from "react-icons/io";
import { LuTrendingUp } from "react-icons/lu";
import { PiNotepadLight } from "react-icons/pi";

function getTime(time: number) {
  const minutes = Math.floor((time % 3600000) / 60000);
  const hours = Math.floor(time / (1000 * 60 * 60));
  return hours ? `${hours}hr ${minutes}m` : `${minutes}m`;
}
export default function Stats({
  streak,
  time,
  lastActive,
}: {
  streak: number;
  time: number;
  lastActive: Date;
}) {
  const timeFormat = getTime(time || 0);

  return (
    <div className="flex flex-wrap gap-3 my-7">
      <Container>
        <div className="flex flex-col ">
          <div className="flex gap-3">
            <PiNotepadLight className="text-4xl bg-(--bg) rounded-lg text-(--border-light) p-1" />
            <div>
              <h4>Current Streak</h4>
              <p>{streak + " Day" + (streak > 1 ? "s" : "")}</p>
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
              <h4>Total time</h4>
              <p>{timeFormat}</p>
              <p className="mt-3">across all session</p>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col ">
          <div className="flex gap-3">
            <LuTrendingUp className="text-4xl bg-(--bg) rounded-lg text-(--border-light) p-1" />
            <div>
              <h4>Reminder</h4>
              <p>
                {lastActive
                  ? new Date(lastActive).toLocaleString()
                  : "you have no session yet"}
              </p>
              <p className="mt-3">last session</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
