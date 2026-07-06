export default function TemporaryLanding() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-[#FAF7F2]">
      <div
        aria-hidden="true"
        className="absolute h-[42rem] w-[42rem] rounded-full opacity-[0.045] blur-3xl"
        style={{ background: "#C8A96E" }}
      />
      <div aria-hidden="true" className="texture-grain absolute inset-0 opacity-70" />

      <section className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center overflow-hidden">
          {"PHOLIO".split("").map((letter) => (
            <span
              key={letter}
              className="font-editorial text-4xl text-[#C8A96E] sm:text-5xl md:text-6xl"
              style={{ letterSpacing: "0.2em" }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="mt-4 h-px w-[120px] rounded-full"
          style={{
            background: "linear-gradient(to right, transparent, #C8A96E, transparent)",
          }}
        />

        <p className="mt-10 font-editorial text-4xl tracking-[-0.04em] text-[#FAF7F2] sm:text-5xl md:text-6xl">
          Opening soon.
        </p>

        <a
          className="btn-gold mt-10"
          href="mailto:founders@pholio.studio?subject=Pholio%20early%20access%20request"
        >
          <span>Request early access</span>
        </a>
      </section>
    </main>
  );
}
