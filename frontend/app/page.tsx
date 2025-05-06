'use client'

import { useState } from 'react'
import Hero from './components/Hero'
import AuditInput from './components/AuditInput'
import ScoreBadge from './components/ScoreBadge'

type AuditResult = {
  performance: number
  seo: number
  accessibility: number
  bestPractices: number
  strategy?: string
  error?: string
}

export default function Home() {
  const [auditData, setAuditData] = useState<AuditResult | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-white to-[#f7faff] px-4 py-16">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl p-10 rounded-3xl transition-all duration-300">
        <Hero />
        <AuditInput onResult={setAuditData} setLoading={setLoading} />

        {/* Error message */}
        {auditData?.error && (
          <p className="text-center text-red-600 mt-6 text-sm">
            {auditData.error}
          </p>
        )}

{(loading || (auditData && !auditData.error)) && (
  <div className="mt-12 animate-fade-in text-center">
    <h2 className="text-2xl font-bold text-gray-800">Audit Summary</h2>
    <p className="text-sm text-gray-500 mt-1">
      Strategy:{' '}
      <span className="font-medium text-blue-600">
        {loading ? '...' : auditData?.strategy === 'desktop' ? 'Desktop' : 'Mobile'}
      </span>
    </p>

    {loading ? (
      <div className="flex justify-center items-center space-x-3 mt-10 h-32">
        <span className="w-5 h-5 bg-blue-600 rounded-full animate-bounce" />
        <span className="w-5 h-5 bg-blue-600 rounded-full animate-bounce delay-150" />
        <span className="w-5 h-5 bg-blue-600 rounded-full animate-bounce delay-300" />
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-center mt-6">
        <ScoreBadge label="Performance" score={auditData?.performance ?? 0} />
        <ScoreBadge label="SEO" score={auditData?.seo ?? 0} />
        <ScoreBadge label="Accessibility" score={auditData?.accessibility ?? 0} />
        <ScoreBadge label="Best Practices" score={auditData?.bestPractices ?? 0} />
      </div>
    )}
  </div>
)}
      </div>
    </main>
  )
}
