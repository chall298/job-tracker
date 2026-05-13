'use server'

import { createClient } from '@/utils//supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createApplication(formData: FormData) {
    const supabase = await createClient()

    const { data: {user} } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }
    
    const application = {
        user_id: user.id,
        company: formData.get('company') as string,
        role: formData.get('role') as string,
        date_applied: formData.get('date_applied') as string,
        url: (formData.get('url') as string) || null,
        notes: (formData.get('notes') as string) || null,
    }

    const { error } = await supabase
        .from('applications')
        .insert(application)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/dashboard')
}