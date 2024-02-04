"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


{/*  ____________News Form Action: addAdd ___________*/ }
export default async function addAdds(formData) {
    const singleAdd = Object.fromEntries(formData)
    const today = new Date();
    const day = today.toLocaleDateString(undefined, { weekday: 'long' })
    const time = today.toLocaleTimeString()

    const date = `${day}|${today.getMonth() + 1}/${today.getDate
        ()}/${today.getFullYear()}|${time}`;


    const supabase = createServerActionClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    //insert data
    const { error } = await supabase.from('adds')
        .insert({
            ...singleAdd,
            user_email: session.user.email,
            release_date: date
        })
    if (error) throw new Error("Failed to insert adds")


    // fetch data and redirect to the tickets page
    revalidatePath('/home/adds')
    redirect('/home/adds')
}
