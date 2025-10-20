import JoinBtn from "./joinBtn";

export default function CTA() {
  return (
    <section className="flex flex-col gap-3 max-w-[700px] text-center mx-auto mb-20">
      <h1>Ready to Grow in Your Faith?</h1>
      <p>
        Join thousands of believers who are deepening their relationship with
        God through intentional spiritual practice.
      </p>
      <div className="mt-2">
        <JoinBtn>Start Tracking Your Journey</JoinBtn>
        <p className="flex items-center justify-center gap-1 mt-2">
          Start your free journey{" "}
          <span className="inline-block size-1.5 bg-(--border-muted) rounded-full"></span>{" "}
          Upgrade anytime
        </p>
      </div>
    </section>
  );
}
