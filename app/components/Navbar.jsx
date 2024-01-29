
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { AiOutlineHome } from "react-icons/ai";
import Image from "next/image";
import Home from "/Home.jpeg";



export default function Navbar({ user }) {
    return (
        <div className=" px-2 sticky top-0 bg-green-500 
           text-gray-100">

            <div className="flex items-center               ">

                <div className="my-1 logo flex items-center ">


                    <Link className="flex items-center space-x-2" href="/">
                        <div className="home-icon">
                            <Image
                                src={Home}
                                alt="home icon"
                                width={30}
                                height={30}
                                className="bg-green-600 rounded-md"
                            />
                        </div>

                        <div className="logo pl-8 sm:pl-20">
                            <h1 className="text-2xl">LOGO</h1>

                        </div>

                        {/*
import Image from "next/image";
import Niger from "./Niger.jpeg"


                        <Image
                            src={Niger}
                            alt="niger flag"
                            width={1}
                            height={1}


                        />
                        
    */}
                    </Link>


                </div>

                <Link href="/home/news" className="pl-12 sm:pl-32">
                    <h2>News</h2>
                </Link>

                <div className="lg:ml-auto my-2 flex md:space-x-24 lg:space-x-6 space-x-6">


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

                <div className="flex my-2 ml-auto">
                    <div className="hidden md:block">
                        {user && <span>Hello, <span className="text-green-900  mr-4 text-sm underline hover:text-green-200">{user.email}</span>  </span>}
                    </div>


                    <div className="hover:text-green-700 hover:bg-green-50 hover:rounded-lg">

                        <LogoutButton />
                    </div>


                </div>

            </div>

        </div>
    )
}
