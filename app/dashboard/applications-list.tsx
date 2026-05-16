import { createClient } from '@/utils/supabase/server'

function formatDate(dateString: string): string {
    // dateString is "YYYY-MM-DD" — parse without timezone conversion
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day) // month is 0-indexed
    return date.toLocaleDateString()
  }

const STATUS_COLORS: Record<string, string> = {
  applied: 'bg-blue-100 text-blue-800',
  interviewing: 'bg-yellow-100 text-yellow-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  ghosted: 'bg-gray-100 text-gray-800',
}

export default async function ApplicationsList() {
  const supabase = await createClient()

  const { data: applications, error } = await supabase
    .from('applications')
    .select('*')
    .order('date_applied', { ascending: false })

  if (error) {
    return (
      <p className="text-red-600 text-sm">
        Error loading applications: {error.message}
      </p>
    )
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed rounded-md">
        <p className="text-gray-600">No applications yet.</p>
        <p className="text-sm text-gray-500 mt-1">Add your first one to get started.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {applications.map((app) => (
        <li key={app.id} className="p-4 border rounded-md">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-semibold">{app.company}</p>
              <p className="text-sm text-gray-700">{app.role}</p>
              <p className="text-xs text-gray-500 mt-1">
                Applied {formatDate(app.date_applied)}
              </p>
              {app.notes && (
                <p className="text-sm text-gray-600 mt-2">{app.notes}</p>
              )}
              {app.url && (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline mt-1 inline-block"
                >
                  View posting
                </a>
              )}
            </div>
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                STATUS_COLORS[app.status] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {app.status}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}