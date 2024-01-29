import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import SeatSelection from "./create/SeatSelection"

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


    return (
        <div className="h-fit max-h-screen p-2 grid overflow-auto md:grid-cols-2 gap-4 xl:grid-cols-3 card-wrapper">
            {tickets.map((ticket) => {
                return <div key={ticket.id} className="card flex flex-col bg-red-500">

                    <div className="bg-blue-400  border border-green-200 shadow-lg">
                        {/*--------- Ticket ----------- */}
                        <div className="grid grid-rows-10 gap-2 h-40 grid-cols-3">
                            <div className="row-span-2 col-span-1 bg-green-500 px-2 py-1">
                                {ticket.cName}
                                <p> 2 + {ticket.seatType} </p>
                            </div>
                            <div className="row-span-2 text-center col-span-1 bg-green-500 px-2 py-1">
                                <p> {ticket.travelTimeHour}  : {ticket.travelTimeMinute} </p>
                                <p> {ticket.durationHour} h {ticket.durationMinute}mn </p>
                            </div>
                            <div className="row-span-2 col-span-1 bg-green-500 px-2 py-1">
                                <p className="">{ticket.price}</p>
                            </div>
                            <div className="row-span-2 col-span-2 bg-green-500 px-2">
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


                        <div className="achetez flex justify-center items-center">
                            <Link className="pb-2 absolute bottom-0 " href={`/tickets/${ticket.id}`}>
                                <button className="bg-green-400 px-2 py-1 rounded-sm">Achetez</button>
                            </Link>
                        </div>

                    </div>

                </div>
            })}


        </div>
    )
}
