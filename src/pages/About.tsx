import SkillBadge from '../components/SkillBadge'

const focusAreas = [
  {
    title: 'Modern Frontend Stack',
    body: 'Expert-level development using React and TypeScript to build robust, type-safe applications.',
  },
  {
    title: 'Design Systems',
    body: 'Architecting and maintaining scalable design languages, ensuring visual consistency and developer efficiency.',
  },
  {
    title: 'Styling & UI',
    body: 'Rapid, responsive UI development leveraging Tailwind CSS.',
  },
  {
    title: 'Web Components',
    body: 'Building framework-agnostic, reusable components to ensure long-term portability and interoperability.',
  },
]

const topSkills = [
  'React.js',
  'Tailwind CSS',
  'Web Components',
  'JavaScript',
  'TypeScript',
]

export default function About() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
          About
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Senior Full Stack Engineer · React &amp; Design Systems Specialist
        </h1>
        <p className="text-base leading-relaxed text-neutral-300">
          With over a decade of experience in the JavaScript ecosystem, I have
          evolved from building traditional full-stack applications to
          architecting modern, scalable front-end ecosystems. My current focus
          centers on React, TypeScript, and the intersection of Design Systems
          and Web Components.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Core Technical Focus</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6"
            >
              <h3 className="mb-2 text-base font-bold text-emerald-300">
                {area.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-300">
                {area.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Top skills</h2>
        <div className="flex flex-wrap gap-3">
          {topSkills.map((skill) => (
            <SkillBadge key={skill} label={skill} />
          ))}
        </div>
      </div>

      <p className="text-base text-neutral-300">
        Have a UI or design-system problem to solve?{' '}
        <a
          href="mailto:warrenkhall@gmail.com"
          className="font-semibold text-emerald-300 underline-offset-4 hover:underline"
        >
          Email me
        </a>
        .
      </p>
    </section>
  )
}
