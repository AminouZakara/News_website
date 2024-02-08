import Link from "next/link";
import { Suspense } from "react";
import Loading from "../Loading";
import TicketList from "./TicketList";



export const metadata = {
    title: 'Zack | Tickets',
}

export default function Tickets() {
    return (
        <div className="min-h-fit flex   bg-green-300">
            <div className="tickets-wrapper ">

                <nav className="ticket-nav m-5 flex justify-center items-center">
                    <h2 className="text-green-900 text-sm  md:text-lg "> T I C K E T S </h2>


                    <div className=" text-green-800 ml-auto">
                        <h2 className="text-md text-red-600">This page is being developed ...</h2>

                        <h2 className="text-sm">Currently Available Tickets</h2>
                    </div>


                    <div className="ml-auto">
                        <Link href="/tickets/create">
                            <button className="bg-green-500 text-green-100 font-bold px-2 py-1">
                                New Ticket
                            </button>
                        </Link>
                    </div>


                </nav>

                <main className="flex">
                    {/*    
                                tickelistMainback grid md:grid-cols-2 gap-4 xl:grid-cols-3 card-wrapper
*/}
                    <Suspense fallback={<Loading />}>
                        <TicketList />

                    </Suspense>
                </main>


            </div>

        </div>
    )
}
