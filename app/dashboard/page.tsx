// import { redirect } from 'next/navigation'
// import { createClient } from '@/utils/supabase/server'
// import LogoutButton from './logout-button'

// export default async function DashboardPage() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()

//   if (!user) {
//     redirect('/login')
//   }

//   return (
//     <div className="min-h-screen p-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <LogoutButton />
//         </div>

//         <p className="mb-2">Welcome, {user.email}</p>
//         <p className="text-sm text-gray-600">
//           User ID: {user.id}
//         </p>

//         <div className="mt-8 p-4 border rounded-md">
//           <p className="text-sm">
//             You're logged in. The applications list will go here next.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import LogoutButton from './logout-button'
import NewApplicationForm from './new-application-form'
import ApplicationsList from './applications-list'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Job applications</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <LogoutButton />
        </div>

        <div className="mb-6">
          <NewApplicationForm />
        </div>

        <ApplicationsList />
      </div>
    </div>
  )
}