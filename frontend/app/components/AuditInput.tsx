'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AuditInput({
  onResult,
  setLoading,
}: {
  onResult: (data: any) => void
  setLoading: (loading: boolean) => void
}) {
  const [url, setUrl] = useState('')
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile')
  const [isAuditing, setIsAuditing] = useState(false)

  const isUrlReachable = async (url: string): Promise<boolean> => {
    try {
      const dnsRes = await fetch(`https://dns.google/resolve?name=${new URL(url).hostname}`)
      const data = await dnsRes.json()
      return data.Status === 0
    } catch {
      return false
    }
  }

  const handleAudit = async () => {
    setIsAuditing(true)
    setLoading(true)

    const cleanedUrl = url.trim()
    const sanitizedUrl = cleanedUrl.startsWith('http') ? cleanedUrl : `https://${cleanedUrl}`

    const reachable = await isUrlReachable(sanitizedUrl)
    if (!reachable) {
      toast.error('This website is unreachable or invalid.')
      setLoading(false)
      setIsAuditing(false)
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: sanitizedUrl, strategy }),
      })

      const data = await res.json()

      if (data.error) {
        toast.error(`Audit failed: ${data.error}`)
        onResult(null)
      } else {
        onResult({ ...data.scores, strategy })
      }
    } catch (err) {
      toast.error('Audit failed. Backend unreachable or misconfigured.')
      console.error(err)
      onResult(null)
    }

    setLoading(false)
    setIsAuditing(false)
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center max-w-xl mx-auto mt-6">
      {/* Strategy toggle */}
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-xl border ${
            strategy === 'mobile' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'
          }`}
          onClick={() => setStrategy('mobile')}
        >
          Mobile
        </button>
        <button
          className={`px-4 py-2 rounded-xl border ${
            strategy === 'desktop' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'
          }`}
          onClick={() => setStrategy('desktop')}
        >
          Desktop
        </button>
      </div>

      {/* Input and button */}
      <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAudit}
          disabled={isAuditing || !url}
          className="whitespace-nowrap bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition hover:bg-blue-700 flex items-center gap-2"
        >
          {isAuditing && <Loader2 className="animate-spin h-5 w-5" />}
          {isAuditing ? 'Auditing...' : 'Run Audit'}
        </button>
      </div>
    </div>
  )
}
