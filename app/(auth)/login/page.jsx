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
        <main className="h-screen flex flex-col items-center ">
            <h2 className="text-center">Login</h2>
            <div className="flex items-center flex-col">

                <label className="text-base pt-4 font-bold">For Checking Purpose</label> <br />
                <label className="text-base font-bold"> Email: <span className="text-base text-green-600">moovestime@gmail.com</span>  </label>
                <label className="text-base font-bold"> Password: <span className="text-base text-green-600">mooves123</span>  </label>
            </div> <br />

            <div className="flex items-center flex-col">
                <AuthForm handleSubmit={handleSubmit} />

                {error && <p className="error text-red-600">{error}</p>}
            </div>



        </main>
    )
}
