"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { RiLogoutCircleRLine } from "react-icons/ri";


export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signOut()

        if (!error) {
            router.push('/login')
        }
        if (error) {
            console.log(error)
        }
    }
    return (
        <button onClick={handleLogout} className="flex items-center">
            <span className="hidden md:block">Logout</span>

            <RiLogoutCircleRLine className="pl-1" />
        </button>
    )
}
