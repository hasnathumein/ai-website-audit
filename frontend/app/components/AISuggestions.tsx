'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type Props = {
  scores: {
    performance: number
    seo: number
    accessibility: number
    bestPractices: number
  }
}

export default function AISuggestions({ scores }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [suggestions, setSuggestions] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchSuggestions = async () => {
    if (suggestions) return setExpanded(!expanded) // toggle
    setLoading(true)

    try {
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores }),
      })
      const data = await res.json()
      setSuggestions(data.message)
      setExpanded(true)
    } catch {
      setSuggestions('❌ Failed to load AI suggestions.')
    }

    setLoading(false)
  }

  return (
    <div className="mt-8">
      <button
        onClick={fetchSuggestions}
        className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
      >
        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        {expanded ? 'Hide Suggestions' : 'Show AI Suggestions'}
      </button>

      {expanded && (
        <div className="mt-4 bg-white/40 backdrop-blur p-5 rounded-xl border border-gray-200 text-sm text-gray-700 shadow-inner">
          {loading ? (
            <p className="animate-pulse">Generating smart recommendations...</p>
          ) : (
            <ul className="list-disc ml-5 space-y-2">
              {suggestions
                ?.split('\n')
                .filter((line) => line.trim() !== '')
                .map((item, i) => (
                  <li key={i}>{item.trim().replace(/^- /, '')}</li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
