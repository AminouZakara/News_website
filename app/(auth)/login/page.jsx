'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "../AuthForm";

export default function Login() {
    const [error, setError] = useState()
    const router = useRouter()

    const handleSubmit = async (e, email, password) => {
        e.preventDefault();
        setError('')

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if (error) {
            setError(error.message)
        }
        if (!error) {
            router.push('/')
        }


    }
    return (
        <main>
            <h2 className="text-center">Login</h2>


            <AuthForm handleSubmit={handleSubmit} />

            {error && <p className="error text-red-600">{error}</p>}


        </main>
    )
}
