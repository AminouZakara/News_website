"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaRegTrashCan } from "react-icons/fa6";

export default function DeleteTicket({ id }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setIsLoading(true)

        const supabase = createClientComponentClient()
        const { data, error } = await supabase
            .from('tickets')
            .delete()
            .match({
                id: id
            }).single()

        // Redirect to the home page on success
        if (error) {
            console.log("Error", error.message)
            setIsLoading(false)
        }
        if (!error) {
            router.refresh()
            router.push('/tickets')
        }
    }


    return (
        <button
            className="btnDelete  md:bg-red-400 md:rounded-md flex justify-center items-center text-green-100  px-1 
            "
            onClick={handleDelete}
            disabled={isLoading}
        >
            {isLoading && (
                <>
                    Deleting ...
                    <FaRegTrashCan className="ml-2 " />

                </>
            )}

            {!isLoading && (
                <>
                    <p className="">Delete</p>

                    <FaRegTrashCan className="ml-2 bg-red-600" />

                </>
            )}
        </button>
    )
}
