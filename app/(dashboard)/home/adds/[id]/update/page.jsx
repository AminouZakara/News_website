import SubmitButton from "@/app/components/SubmitButton"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"



async function getSingleAdd(id) {
    //imitate delay
    // await new Promise(resolve => setTimeout(resolve, 3000))

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('adds')
        .select()
        .eq('id', id)
        .single()
    if (!data) {
        notFound()
    }
    return data
}


export default async function UpdateAdd({ params }) {
    const singleAdd = await getSingleAdd(params.id)

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    async function updateAdd(formData) {
        "use server"
        const singleAdd1 = Object.fromEntries(formData)

        const supabase = createServerComponentClient({ cookies })
        const { data: { session } } = await supabase.auth.getSession()

        const { data, error } = await supabase
            .from('adds')
            .update({
                image: singleAdd1.image,
                title: singleAdd1.title,
                body: singleAdd1.body,
                user_email: session.user.email
            })
            .eq(
                "id", singleAdd.id)

            .select()
        if (data) {
            console.log(data)
        }
        if (error) {
            (`Failed to update news with id ${singleAdd?.id}`)
        }
        revalidatePath('/home/adds')
        redirect('/home/adds')
    }
    return (
        <div className=" h-screen flex justify-center bg-green-300 ">
            <div className="w-full flex flex-row justify-center">
                <div className="mt-4">
                    <h2>Update Form</h2>
                </div>

                <form action={updateAdd} className="w-3/4 md:w-1/2 mt-16">
                    <label>
                        <span>Image:</span>
                        <input type="text"
                            name="image"
                            defaultValue={singleAdd?.image}
                        />
                    </label>

                    <label>
                        <span className="text-xl font-serif">Title :</span>
                        <input
                            className="text-xl w-80  font-serif mt-2 md:mt-0 px-2 py-1"
                            type="text"
                            name="title"
                            defaultValue={singleAdd?.title}
                            required
                        />
                    </label>
                    <label className="mt-12 flex flex-col md:flex-row ">
                        <span className="text-xl font-serif">Body:</span>
                        <textarea
                            className="text-lg font-serif px-2 py-1 w-8/9 md:w-5/6 h-60 mt-2 md:mt-0"
                            name="body"
                            defaultValue={singleAdd?.body}
                            required
                        />
                    </label>

                    <div className="btn flex justify-center items-baseline">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    )
}
