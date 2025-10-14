import Image from "next/image";

export default function Card({
  src,
  title,
  text,
}: {
  src: string;
  title: string;
  text: string;
}) {
  return (
    <div className=" rounded-2xl shadow-xl bg-(--bg-dark) hover:-translate-y-2 hover:shadow-2xl transition-all duration-200 ">
      <div className=" w-full h-[350px]">
        <Image
          className="rounded-2xl w-full  bg-cover object-cover h-full"
          objectFit="cover"
          width={250}
          height={350}
          alt={""}
          src={src}
        />
      </div>
      <div className="px-5 pt-6 pb-9">
        <h2>{title}</h2>
        <p className="mt-2">{text}</p>
      </div>
    </div>
  );
}
