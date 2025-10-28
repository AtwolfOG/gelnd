"use client";
import React from "react";
import Container from "@/components/container";
import { PiBookOpenThin } from "react-icons/pi";
import { useRouter } from "next/navigation";

function Session() {
  const router = useRouter();
  function handleClick(type: string) {
    router.push(`/user/timer?type=${type}`);
  }
  return (
    <Container>
      <div className="pt-2 pb-4">
        <h4>Start a Session</h4>
        <div className="flex flex-wrap gap-5 mt-7">
          <button
            onClick={() => handleClick("bible")}
            className="flex items-center gap-3 grow border border-(--border-light) bg-(--bg-light) duration-200 hover:bg-(--bg-dark) justify-center p-3 rounded-xl "
          >
            <PiBookOpenThin className="text-2xl text-(--border-light)" />
            <div className="text-left">
              <h4>Bible Study</h4>
              <p>Start tracking your study time</p>
            </div>
          </button>
          <button
            onClick={() => handleClick("prayer")}
            className="flex items-center gap-3 grow border border-(--border-light) bg-(--bg-light) duration-200 hover:bg-(--bg-dark) justify-center p-3 rounded-xl "
          >
            <PiBookOpenThin className="text-2xl text-(--border-light)" />
            <div className="text-left">
              <h4>Prayer Time</h4>
              <p>Track your prayer session</p>
            </div>
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Session;
