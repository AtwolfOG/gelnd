import Image from "next/image";
import Card from "./card";
import JoinBtn from "@/components/joinBtn";
interface cardType {
  src: string;
  title: string;
  text: string;
}
const cardData: cardType[] = [
  {
    src: "/images/image5.jpg",
    title: "Measure & Track Your Time",
    text: "Log the time you spend in Bible study and prayer to build daily habits that strengthen your faith.",
  },
  {
    src: "/images/image2.jpg",
    title: "Document Your Journey",
    text: "Keep a personal spiritual journal. Reflect on what God is doing in your life over time.",
  },
  {
    src: "/images/image1.jpg",
    title: "See Your Growth",
    text: "Gain clear insight into your spiritual habits through visual charts and reports.",
  },
];

export default function Home() {
  return (
    <>
      <div className="w-full min-h-[300px] h-[70vh]  bg-cover bg-center flex flex-col justify-center px-5 sm:px-10 items-start hero">
        <h1 className="text-(--accent-color)!">
          Grow in Your Faith with Intentionality.
        </h1>
        <h2 className="max-w-[40ch] mb-6">
          Track your time spent in Bible study and prayer, journal your
          revelations, and reflect on your spiritual growth — all in one
          peaceful place.
        </h2>
        <JoinBtn>Start Your Journey Today</JoinBtn>
      </div>
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,_minmax(320px,500px))] p-10 py-20 justify-center md:grid-cols-[minmax(375px,400px)_350px] md:mt-15 lg:grid-cols-[460px_350px]">
        <div className="flex flex-col max-w-[470px] py-3 px-2 gap-3">
          <h2>Build a Consistent and Meaningful Spiritual Life</h2>
          <p className="">
            Staying consistent in your spiritual journey can be challenging,
            distractions, busy schedules, and lack of structure can make it hard
            to grow.
          </p>
          <p>
            This app gives you a personal space to focus, reflect, and stay
            accountable to your walk with God.
          </p>
        </div>
        <Image src={"/images/hero1.png"} width={350} height={400} alt="" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,320px))] gap-x-5 gap-y-10 justify-center my-10">
        {cardData.map((data) => (
          <Card
            key={data.title}
            src={data.src}
            title={data.title}
            text={data.text}
          />
        ))}
      </div>
      <section id="testimonials" className="testimonials ">
        <div className="testimonial-card bg-(--bg-dark)">
          <div className="testimonial-header">
            <Image
              src="/images/profile.jpg"
              alt="User avatar"
              width={50}
              height={50}
              className="testimonial-avatar"
            />
            <div className="testimonial-user">
              <h4>A Grateful User</h4>
              <span>Faithful App User</span>
            </div>
          </div>

          <blockquote>
            “This app helped me stay consistent with my quiet time and actually
            see how I was growing spiritually. It’s like a daily reminder to
            stay connected.”
          </blockquote>

          <p className="subtitle">
            Faith grows stronger when nurtured intentionally.
          </p>
        </div>
      </section>
      <section className="">
        <div className=" m-auto bg-(--bg-dark) w-[80vw] px-10 pt-20 pb-10 rounded-2xl">
          <h1>Your Journey with God Matters.</h1>
          <h2 className="max-w-[500px] mb-10">
            Start today — not just to track your time, but to deepen your faith
            intentionally.
          </h2>
          <JoinBtn>Create free account</JoinBtn>
        </div>
      </section>
    </>
  );
}
