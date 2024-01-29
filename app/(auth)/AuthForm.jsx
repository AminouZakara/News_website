"use client"

import { useState } from "react"


export default function AuthForm({ handleSubmit }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <form onSubmit={(e) => handleSubmit(e, email, password)} className="bg-green-500">
            <label>
                <span> Email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            </label>
            <label>
                <span>Password: </span>
                <input type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required

                />
            </label>
            <div className="btnAuthForm flex justify-center">
                <button className="bg-green-500  text-green-100 text-base"> Submit </button>

            </div>

        </form>
    )
}
