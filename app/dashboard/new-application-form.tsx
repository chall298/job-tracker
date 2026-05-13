'use client'

import { useState } from 'react'
import { createApplication } from './actions'

export default function NewApplicationForm() {
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        setSubmitting(true)
        setError(null)
        try{
            await createApplication(formData)
            setIsOpen(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-black text-white rounded-md text-sm"
            >
                + Add application
            </button>
        )
    }

    return (
        <div className="p-4 border rounded-md bg-gray-50">
      <h2 className="font-semibold mb-4">New application</h2>

      <form action={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            name="company"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            name="role"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date applied</label>
          <input
            name="date_applied"
            type="date"
            required
            defaultValue={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            defaultValue="applied"
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="ghosted">Ghosted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Job posting URL (optional)</label>
          <input
            name="url"
            type="url"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes (optional)</label>
          <textarea
            name="notes"
            rows={3}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-black text-white rounded-md text-sm disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={submitting}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    )
}