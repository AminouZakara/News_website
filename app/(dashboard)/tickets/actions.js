"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"



export async function addTicket(formData) {
    const ticket = Object.fromEntries(formData)

    const supabase = createServerActionClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    //insert data
    const { error } = await supabase.from('tickets')
        .insert({
            ...ticket,
            user_email: session.user.email
        })

    // fetch data and redirect to the tickets page
    revalidatePath('/tickets')
    redirect('/tickets')


}