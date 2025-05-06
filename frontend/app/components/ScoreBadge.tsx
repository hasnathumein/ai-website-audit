type Props = {
  label: string
  score: number
  loading?: boolean
}

export default function ScoreBadge({ label, score, loading = false }: Props) {
  const percent = loading ? 0 : score

  const borderClass = loading
    ? 'border-gray-200 animate-spin'
    : percent >= 90
    ? 'border-green-500 text-green-500'
    : percent >= 70
    ? 'border-yellow-500 text-yellow-500'
    : 'border-red-500 text-red-500'

  return (
    <div className="flex flex-col items-center justify-center space-y-2 min-w-[120px]">
      <div className="relative w-24 h-24">
        <div
          className={`w-full h-full rounded-full border-8 ${borderClass}`}
        />
        {!loading && (
          <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-900">
            {percent}%
          </span>
        )}
      </div>
      <div className="text-sm font-semibold text-gray-800">{label}</div>
    </div>
  )
}
