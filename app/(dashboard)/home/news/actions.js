"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


{/*  ____________News Form Action: addNews ___________*/ }
export async function addNews(formData) {
    const singleNews = Object.fromEntries(formData)
    const today = new Date();
    const day = today.toLocaleDateString(undefined, { weekday: 'long' })
    const time = today.toLocaleTimeString()

    const date = `${day}|${today.getMonth() + 1}/${today.getDate
        ()}/${today.getFullYear()}|${time}`;


    const supabase = createServerActionClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    //insert data
    const { error } = await supabase.from('news')
        .insert({
            ...singleNews,
            user_email: session.user.email,
            release_date: date


        })
    if (error) throw new Error("Failed to insert news")


    // fetch data and redirect to the tickets page
    revalidatePath('/home/news')
    redirect('/home/news')
}





