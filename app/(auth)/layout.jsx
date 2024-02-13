import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    if (data.session) {
        redirect('/')
    }
    return (
        <div className="h-screen">
            <nav>


                <div className="relative bg-green-500  flex justify-center items-center text-gray-100">
                    <Link className="mr-auto pl-4" href="/">
                        <h1 className="flex text-2xl">LOGO</h1>

                    </Link>



                    <Link href="/login"> <h2>Login</h2> </Link>
                    <Link className="mx-4" href="/signup"> <h2>Sign up</h2> </Link>


                </div>
            </nav>



            {children}


        </div>
    )
}
