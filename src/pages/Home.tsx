export default function Home() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Hey, I'm Warren 🖖🏻
      </h1>
      <h2 className="text-lg font-semibold text-emerald-300 sm:text-xl">
        Senior Full Stack Engineer · React &amp; Design Systems Specialist
      </h2>
      <div className="mt-2 flex flex-wrap gap-4">
        <a
          href="mailto:warrenkhall@gmail.com"
          className="rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-300"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/warrenkhall/"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-neutral-700 px-6 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-500"
        >
          LinkedIn
        </a>
      </div>
    </section>
  )
}
