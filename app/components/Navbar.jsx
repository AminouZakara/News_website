
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { AiOutlineHome } from "react-icons/ai";
import Image from "next/image";
import Home from "/Home.jpeg";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export default async function Navbar({ user }) {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    return (
        <div className=" px-2 sticky top-0 bg-green-500 
           text-gray-100">

            <div className="flex justify-between items-center">

                {/* ---------Left Nav-items----------*/}
                <Link className="flex " href="/">
                    <div className="home-icon">
                        <Image
                            src={Home}
                            alt="home icon"
                            width={30}
                            height={30}
                            className="bg-green-600 rounded-md"
                        />
                    </div>

                    <div >
                        <h1 className="pl-1 text-2xl">LOGO</h1>

                    </div>


                </Link>


                {/* ---------Center Nav-items----------*/}
                <div className="nav-items flex" >
                    <Link href="/home/news" >
                        <h2>News</h2>
                    </Link>

                    <Link href="/" className="pl-2" >
                        <h2>Link 2</h2>
                    </Link>
                    <Link href="/" className="pl-2" >
                        <h2>Link 2</h2>
                    </Link>
                    {data.session.user.email == "aminuzak446@gmail.com" && (
                        <Link href="/home/adds" className="pl-2" >
                            <h2>Adds</h2>
                        </Link>
                    )}

                </div>



                {/* ---------Right Nav-items----------*/}
                <div className="flex py-2">
                    <div className="hidden md:block">
                        {user && <span>Hello, <span className="text-green-900  pr-4 text-sm underline hover:text-green-200">{user.email}</span>  </span>}
                    </div>
                    <div className="hover:text-green-700 hover:bg-green-50 hover:rounded-lg">

                        <LogoutButton />
                    </div>


                </div>

            </div>


            <div >


                {/* Other Links 
                    <Link href="/tickets " className="hover:text-green-700 hover:bg-green-50 hover:rounded-lg"><button> <h1>Voyage</h1> </button></Link>

                    <Link className="hover:text-green-700 hover:bg-green-50 hover:rounded-lg" href="/location"><h1 className="">Location</h1>
                    </Link>

                    <Link className="hover:text-green-700 hover:bg-green-50 hover:rounded-lg" href="/vente"><h1 className="">Vente</h1>
                    </Link>

                    <Link className="hover:text-green-700 hover:bg-green-50 hover:rounded-lg" href="/contact"><h1 className="">Contact</h1>
                    </Link>

                    <Link className="hover:text-green-700 hover:bg-green-50 hover:rounded-lg" href="/about"><h1 className="">About us</h1>
                    </Link>
                    */}
            </div>

        </div>
    )
}
