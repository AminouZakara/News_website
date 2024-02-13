"use client"

import { useState } from "react"


export default function AuthForm({ handleSubmit }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <form onSubmit={(e) => handleSubmit(e, email, password)} className="bg-green-500">
            <label>
                <span className="pr-9"> Email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            </label>
            <label>
                <span className="pr-1">Password: </span>
                <input type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required

                />
            </label>
            <div className="btnAuthForm flex justify-end pr-5">
                <button className="bg-green-500 hover:text-md  text-green-50 hover:text-green-200 text-base"> Submit </button>

            </div>


        </form>
    )
}
