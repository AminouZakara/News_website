import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { FaEdit } from "react-icons/fa"
import SeatSelection from "./create/SeatSelection"
import DeleteTicket from "./[id]/DeleteTicket"
import { PiArmchairThin } from "react-icons/pi";

async function getTickets() {
    const supabase = createServerComponentClient({ cookies })
    {/*  ----------Go To the a Single Ticket ------------- 
                                <Link href={`/tickets/${ticket.id}`}>

                                    </Link> 
                                */}
    const { data, error } = await supabase.from('tickets')
        .select()

    if (error) {
        console.log(error.message)
    }
    if (data) {
        return data;
    }
}

export default async function TicketList() {
    const tickets = await getTickets()

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()


    return (
        <div className="h-fit max-h-screen p-2 grid overflow-auto md:grid-cols-2 gap-4 xl:grid-cols-3 card-wrapper">
            {tickets.map((ticket) => {
                return <div key={ticket.id} className="card rounded-md flex flex-col bg-red-500">

                    <div className="bg-green-100 rounded-md  border border-green-200 shadow-lg">
                        {/*--------- Ticket ----------- */}
                        {/*
                        
                        */}

                        <div className="grid grid-rows-10 gap-2 h-40 grid-cols-3">
                            <div className="row-span-2 col-span-1  px-2 py-1 flex flex-col justify-between">
                                <h2 className="text-lg ">{ticket.cName}</h2>
                                <p className="flex items-center text-sm text-gray-600"> <PiArmchairThin />  <span className="px-1">2</span> + <span className="px-1">{ticket.seatType}</span> </p>
                            </div>
                            <div className="row-span-2  text-center col-span-1 bg-green px-2 py-1">
                                <p> {ticket.travelTimeHour}  : {ticket.travelTimeMinute} </p>
                                <p className="text-sm text-gray-500 "> {ticket.durationHour}h {ticket.durationMinute}mn </p>
                            </div>
                            <div className="row-span-2 col-span-1 flex flex-col justify-start items-end rounded-md p-1">
                                <p className="bg-green-200 px-1 text-green-700 font-bold">{ticket.price} <span>CFA</span></p>
                            </div>

                            <div className="row-span-2 col-span-2 flex items-center text-gray-800 px-2">
                                <p> {ticket.departure} - {ticket.destination} </p>

                            </div>
                            <div className="flex row-span-2 bg-yellow-500 col-span-3 border border-red-500 px-2">
                                <div className="check ml-auto italic">check</div>
                            </div>
                        </div>


                    </div>
                    <div className="check relative bg-gray-500 h-64">

                        <div className="details px-1 py-1">
                            <SeatSelection />
                            <div> {ticket.seat_number} </div>

                        </div>


                        <div className="achetez w-full flex justify-around items-center">
                            {data.session.user.email === ticket.user_email && (
                                <Link className="" href={`/tickets/${ticket.id}/update`}>
                                    <button className="flex items-center bg-green-400 rounded-md text-green-50 px-1">
                                        Update
                                        <FaEdit className="ml-2" />
                                    </button>
                                </Link>
                            )}



                            <Link className="" href={`/tickets/${ticket.id}`}>
                                <button className="bg-green-400 px-2 py-1 rounded-sm hover:bg-green-50 hover:text-green-800 hover:font-extrabold">
                                    Achetez
                                </button>
                            </Link>

                            {data.session.user.email === ticket.user_email && (
                                <div className="deleteNew mt-auto pb-1">
                                    <DeleteTicket id={ticket.id} />
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            })}


        </div>
    )
}
