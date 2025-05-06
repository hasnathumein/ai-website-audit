import ScoreBadge from './ScoreBadge'

export default function AuditSummary({
  scores,
  loading,
  strategy,
}: {
  scores: {
    performance: number
    seo: number
    accessibility: number
    bestPractices: number
  }
  loading: boolean
  strategy: 'mobile' | 'desktop'
}) {
  return (
    <div className="mt-10 w-full max-w-5xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">Audit Summary</h2>
      <p className="text-gray-600 text-sm mb-6">
        Strategy: <span className="text-blue-600 capitalize">{strategy}</span>
      </p>

      {loading ? (
        <div className="flex justify-center space-x-4 mt-6">
          <span className="animate-bounce w-4 h-4 bg-gray-400 rounded-full" />
          <span className="animate-bounce w-4 h-4 bg-gray-400 rounded-full delay-150" />
          <span className="animate-bounce w-4 h-4 bg-gray-400 rounded-full delay-300" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center mt-6">
          <ScoreBadge label="Performance" score={scores.performance} />
          <ScoreBadge label="SEO" score={scores.seo} />
          <ScoreBadge label="Accessibility" score={scores.accessibility} />
          <ScoreBadge label="Best Practices" score={scores.bestPractices} />
        </div>
      )}
    </div>
  )
}
