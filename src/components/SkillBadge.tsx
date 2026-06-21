export default function SkillBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-semibold text-emerald-300">
      {label}
    </span>
  )
}
