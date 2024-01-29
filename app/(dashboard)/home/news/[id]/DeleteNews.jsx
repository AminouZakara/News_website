"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaRegTrashCan } from "react-icons/fa6";




export default function DeleteNews({ id }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleClick = async () => {
        setIsLoading(true)

        const supabase = createClientComponentClient()
        const { data, error } = await supabase.from('news').delete().match({
            id: id
        }).single()

        // Redirect to the home page on success
        if (error) {
            console.log("Error", error.message)
            setIsLoading(false)
        }
        if (!error) {
            router.refresh()
            router.push('/home/news')
        }
    }


    return (
        <button
            className="btnDelete  md:bg-red-400 md:rounded-md flex justify-center items-center text-green-100  md:px-2 
            "
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading && (
                <>
                    Deleting ...
                    <FaRegTrashCan className="md:ml-2 bg-black" />

                </>
            )}

            {!isLoading && (
                <>
                    <p className="hidden md:block">Delete News</p>

                    <FaRegTrashCan className="md:ml-4 bg-black" />

                </>
            )}
        </button>
    )
}
