'use server'

import { createClient } from '@/utils/supabase/server'
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
        status: formData.get('status') as string,
        url: (formData.get('url') as string) || null,
        notes: (formData.get('notes') as string) || null,
    }

    // console.log('Inserting application:', application)
    // console.log('Status from FormData:', formData.get('status'))

    const { data, error } = await supabase
        .from('applications')
        .insert(application)
        .select()

    // console.log('Insert result:', { data, error })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/dashboard')
}