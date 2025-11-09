import { PiBookOpenThin } from "react-icons/pi";
import JoinBtn from "./joinBtn";

export default function Footer() {
  return (
    <section className="">
      <div className=" grid  grid-cols-1 md:grid-cols-3 gap-12 m-auto bg-(--bg-dark) w-[80vw] max-w-[900px] px-5 md:px-10 pt-20 pb-10 rounded-2xl">
        <div>
          <h1 className="flex items-center gap-2">
            <PiBookOpenThin className="inline text-(--border-muted)" />{" "}
            <span className="logo">GELND</span>
          </h1>
          <p className="max-w-[20ch] mb-10">
            Empowering believers to grow deeper in their faith through
            intentional spiritual tracking.
          </p>
          <JoinBtn>Create free account</JoinBtn>
        </div>
        <div>
          <h4 className="mb-5">Navigation</h4>
          <ul className="flex justify-center flex-col">
            <Item text="Features" />
            <Item text="Guide" />
            <Item text="Benefits" />
          </ul>
        </div>
        <div>
          <h4 className="mb-5">Developed by</h4>
          <p>Atwolf</p>
        </div>
      </div>
    </section>
  );
}

function Item({ text }: { text: string }) {
  return (
    <a
      href={`#${text.toLowerCase()}`}
      className="text-(--text-light) duration-200 hover:text-(--text) p-2 underline under"
    >
      <li>{text}</li>
    </a>
  );
}
