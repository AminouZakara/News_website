"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"



export default async function addAdds(formData) {

    const singleAdd = Object.fromEntries(formData)

    const supabase = createServerActionClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    //insert data
    const { error } = await supabase.from('adds')
        .insert({
            ...singleAdd,
            user_email: session.user.email
        })
    if (error) throw new Error("Failed to insert adds")


    // fetch data and redirect to the tickets page
    revalidatePath('/home/adds')
    redirect('/home/adds')
}
