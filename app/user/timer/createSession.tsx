"use client";
import Container from "@/components/container";
import { useSearchParams } from "next/navigation";
import { useEffect, useReducer, type ChangeEvent } from "react";
import { PiBookOpenThin } from "react-icons/pi";
import Cookies from "js-cookie";
import { RiDeleteBinLine } from "react-icons/ri";
import { Bounce, toast } from "react-toastify";
import { createSession, deleteSession, saveSession } from "@/lib/session";
import TextInput from "@/components/customInput";
import { toastError, toastSuccess } from "@/components/toast";

interface stateType {
  type: string;
  entry: string;
  time: number;
  started: boolean;
}
function getTime(time: number) {
  const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, "0");
  const hours = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, "0");
  return `${hours} : ${minutes} : ${seconds}`;
}
function reducer(
  state: stateType,
  action: {
    types: string;
    type?: string;
    entry?: string;
    time?: number;
    started?: boolean;
  }
): stateType {
  switch (action.types) {
    case "type":
      return { ...state, type: action.type ?? "" };
    case "entry":
      return { ...state, entry: action.entry ?? "" };
    case "time":
      return { ...state, time: state.time + 1000 };
    case "session":
      return {
        type: action.type ?? "",
        entry: action.entry ?? "",
        time: action.time ?? 0,
        started: true,
      };
    case "start":
      if (action.started) return { ...state, started: action.started };
      return {
        type: "",
        entry: "",
        time: 0,
        started: false,
      };
    default:
      return state;
  }
}
let timerId: NodeJS.Timeout;
export default function CreateSession() {
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, {
    type: "",
    entry: "",
    time: 0,
    started: false,
  });
  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      dispatch({ types: "type", type });
    }
    const session = Cookies.get("session");
    if (session) {
      const data = JSON.parse(session);
      const state = data.state;
      dispatch({ types: "session", ...state, time: Date.now() - state.time });
      if (timerId) clearInterval(timerId);
      timerId = setInterval(() => {
        dispatch({ types: "time" });
      }, 1000);
    }
  }, [searchParams]);
  function handleClick(type: string) {
    if (state.started) return;
    dispatch({ types: "type", type });
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ types: "entry", entry: e.target.value });
  }
  async function handleStart() {
    try {
      if (!state.type || !state.entry) {
        return toastError("Please select and fill the fields");
      }
      const id = await createSession({ type: state.type, entry: state.entry });
      dispatch({ types: "start", started: true });
      Cookies.set(
        "session",
        JSON.stringify({
          state: {
            type: state.type,
            entry: state.entry,
            time: Date.now(),
          },
          id,
        }),
        { expires: 1 }
      );
      timerId = setInterval(() => {
        dispatch({ types: "time" });
      }, 1000);
    } catch (err) {
      toast.error(
        (err instanceof Error && err.message) || "An error occoured",
        {
          autoClose: 3000,
          transition: Bounce,
        }
      );
    }
  }
  async function handleDelete() {
    try {
      clearInterval(timerId);
      await deleteSession();
      dispatch({ types: "start", started: false });
      toast.info("session deleted", {
        autoClose: 3000,
        closeOnClick: true,
        transition: Bounce,
      });
    } catch (err) {
      toast.error((err instanceof Error && err.message) || "An error occourd", {
        autoClose: 3000,
        transition: Bounce,
      });
    }
  }
  async function handleSave() {
    if (!(state.time >= 60000))
      return toastError("Your session has to be at least a minute");
    clearInterval(timerId);
    dispatch({ types: "start", started: false });
    await saveSession(state.time);
    toastSuccess("session saved");
  }
  return (
    <div className="max-w-[400px] grow">
      <Container>
        <div className="flex flex-col gap-5 py-5">
          <div className="flex gap-3 m-auto justify-center">
            <button
              onClick={() => handleClick("bible")}
              className={`flex items-center gap-3 border border-(--border-light) bg-(--bg-light) duration-200 hover:bg-(--bg-dark) justify-center p-3 rounded-xl ${
                state.type && state.type == "bible" ? "bg-(--bg-dark)!" : ""
              } `}
            >
              <PiBookOpenThin className="text-2xl text-(--border-light)" />
              <h4>Bible Study</h4>
            </button>
            <button
              onClick={() => handleClick("prayer")}
              className={`flex items-center gap-3 border border-(--border-light) bg-(--bg-light) duration-200 hover:bg-(--bg-dark) justify-center p-3 rounded-xl ${
                state.type && state.type == "prayer" ? "bg-(--bg-dark)!" : ""
              } `}
            >
              <PiBookOpenThin className="text-2xl text-(--border-light)" />
              <h4>Prayer Time</h4>
            </button>
          </div>
          <div>
            {state.started ? (
              <h2 className="text-center">{state.entry}</h2>
            ) : (
              <>
                <p>Session title</p>
                <TextInput
                  placeholder="enter an entry"
                  onChange={handleChange}
                  value={state.entry}
                />
              </>
            )}
          </div>
          <h1 className="m-auto my-5">{getTime(state.time)}</h1>
          {state.started ? (
            <div className="flex gap-3 justify-center">
              <button
                className=" p-3 rounded-lg bg-(--danger) hover:bg-(--danger-dark) duration-200"
                onClick={handleDelete}
              >
                <RiDeleteBinLine className="inline text-lg mr-1" />
                delete
              </button>
              <button
                className=" p-3 rounded-lg bg-(--success) hover:bg-(--success-dark) duration-200"
                onClick={handleSave}
              >
                stop & save
              </button>
            </div>
          ) : (
            <button
              className="border border-(--border-light) p-3 rounded-lg text-(--text) hover:bg-(--bg-dark)"
              onClick={handleStart}
            >
              S T A R T
            </button>
          )}
        </div>
      </Container>
    </div>
  );
}
