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
        <>
            <nav>


                <div className="relative bg-green-500 h-16 flex justify-center items-center text-gray-100">
                    <Link className="mr-auto pl-4" href="/">
                        <h1 className="flex text-2xl">LOGO</h1>

                    </Link>

                    <Link href="/home/news" className="mr-auto">
                        <h2>News</h2>
                    </Link>

                    <Link href="/login"> <h2>Login</h2> </Link>
                    <Link className="mx-4" href="/signup"> <h2>Sign up</h2> </Link>


                </div>
            </nav>
            <div className="flex items-center pt-4 flex-col">

                <label className="text-base font-bold">For Checking Purpose</label> <br />
                <label className="text-base font-bold"> Email: <span className="text-base text-green-600">moovestime@gmail.com</span>  </label>
                <label className="text-base mr-16 font-bold"> Password: <span className="text-base text-green-600">mooves123</span>  </label>
            </div> <br />


            {children}


        </>
    )
}
