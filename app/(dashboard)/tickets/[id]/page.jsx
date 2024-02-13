import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"
import DeleteButton from "./DeleteTicket"

export async function generateMetadata({ params }) {
    const supabase = createServerComponentClient({ cookies })
    const { data: ticket } = await supabase.from('tickets')
        .select()
        .eq('id', params.id)
        .single()

    return {
        title: `Ticket From | ${ticket.cName || 'Ticket Not Found'} `
    }
}


async function getTicket(id) {
    //imitate delay
    // await new Promise(resolve => setTimeout(resolve, 3000))

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('tickets')
        .select()
        .eq('id', id)
        .single()


    if (!data) {
        notFound()
    }


    return data


}

export default async function TicketDetails({ params }) {

    const ticket = await getTicket(params.id)

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()



    return (
        <main className="h-screen   bg-green-300">

            <nav>
                <h2>Tickets NavBar</h2>


            </nav>


            {/* 
            <div class="grid grid-rows-3 grid-flow-col gap-4">
                <div class="row-span-3 ...">01</div>
                <div class="col-span-2 ...">02</div>
                <div class="row-span-2 col-span-2 ...">03</div>
            </div>
    */}

            <div className=" border-4 w-5/6 relative 
            
            ">
                <div className=" grid m-2
                lg:grid-rows-3 xl:grid-cols-3
                md:grid-rows-2 md:grid-cols-2
                sm:grid-rows-1 sm:grid-cols-1
                gap-4 ">
                    <div className=" Travel Itenerary flex">
                        <h3 className="mr-2">Itinerary:</h3>

                        <h3> {ticket.departure} </h3>
                        <h3> - </h3>
                        <h3> {ticket.destination} </h3>
                    </div>

                    <div className="">
                        <h3 className="mr-2">Compagnie De Transport: {ticket.cName} </h3>
                    </div>


                    <div>
                        <h3>Seat Type: 2 + {ticket.seatType} </h3>
                    </div>

                    <div className="travelTime flex">
                        <h3 className="mr-2">Travel Time:</h3>
                        <h3> {ticket.travelTimeHour} </h3>
                        <h3> : </h3>
                        <h3> {ticket.travelTimeMinute} </h3>
                    </div>

                    <div className="travelDuration flex ">
                        <h3 className="mr-2">Travel Duration:</h3>
                        <h3 className="mx-2 ">{ticket.durationHour} <span className="text-gray-500">hours</span>   {ticket.durationMinute} <span className="text-gray-500">minutes</span>  </h3>
                    </div>

                    <div className="price flex">
                        <h3> Price: {ticket.price} <span className="text-gray-500">FCFA</span></h3>
                    </div>

                    <div className="ml-auto flex flex-col justify-center items-center font-bold absolute right-2">

                        <div className="mb-20 ">
                            <Link href={`/tickets/${ticket.id}`}>
                                <button className="bg-green-500 text-green-100 font-bold px-2 py-1">
                                    Edit Ticket
                                </button>
                            </Link>
                        </div>



                    </div>

                </div>


                <div className="achetez mt-4">
                    <button className="bg-green-500 text-gray-100 font-bold px-3 py-2 rounded-sm"> Achetez </button>
                </div>



            </div>
        </main>
    )
}
