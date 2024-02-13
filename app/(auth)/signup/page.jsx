"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AuthForm from '../AuthForm'

export default function Signup() {
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e, email, password) => {
        e.preventDefault();

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/api/auth/callback`
            }
        })

        if (error) {
            setError(error.message)

        }
        if (!error) {
            router.push('/verify')
        }

    }
    return (
        <main className="flex items-center flex-col">
            <h2 className="text-center">
                Sign up
            </h2>
            <div className="flex items-center flex-col">

                <label className="text-base pt-4 font-bold">For Checking Purpose</label> <br />
                <label className="text-base font-bold"> Email: <span className="text-base text-green-600">moovestime@gmail.com</span>  </label>
                <label className="text-base font-bold"> Password: <span className="text-base text-green-600">mooves123</span>  </label>
            </div> <br />

            <div className="flex items-center flex-col">
                <AuthForm handleSubmit={handleSubmit} />
                <div className="errormessage">
                    {error &&
                        <p>{error}</p>}
                </div>
            </div>

        </main>
    )
}
