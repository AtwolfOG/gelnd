import { BsJustifyLeft } from "react-icons/bs";
import TimeSpent from "./timeSpent";
import CreateSession from "./createSession";
import { Note } from "./note";
import Notes from "./notes";
import { cookies } from "next/headers";

export default async function Page() {
  const session = (await cookies()).get("session")?.value;
  return (
    <div>
      <h1>Time Tracker</h1>
      <p>Track your bible study and prayer time.</p>
      <div className="max-w-[900px] flex flex-col gap-15">
        <div className="mt-7 max-w-[900px]">
          <TimeSpent />
        </div>
        <div className="flex flex-wrap gap-15 ">
          <CreateSession />
          <Note />
        </div>
        <div>{session && <Notes />}</div>
      </div>
    </div>
  );
}
