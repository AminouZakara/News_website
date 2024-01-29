"use client"

import { useState } from "react"

export default function CheckTheTickt() {
    const [toggle, setToggle] = useState()

    return (
        <main
            onClick={() => setToggle(!toggle)}
            className={`col-span-1 row-span-1 border border-t-green-600 cursor-pointer ${toggle ? " bg-blue-500" : "bg-red-500"} hover:bg-green-200`}>
            <div>
                <div className="grid bg-green-50  border border-green-200 justify-center shadow-lg w-96 h-36 relative rounded-md grid-rows-4 grid-cols-1">
                    {/*--------- Ticket ----------- */}
                    <div className="ticketPart1 flex justify-between">

                        <div className="first ">
                            <div className="logo-image mb-2">

                                <h2>
                                    <Image
                                        src={Logo}
                                        alt="Rimbo logo"
                                        width={50}
                                        height={38}
                                    />

                                    {ticket.cName} </h2>

                            </div>

                            <div className="seatType text-zinc-500 text-xs ">
                                <p> 2 + {ticket.seatType} </p>
                            </div>

                        </div>

                        <div className="second ">
                            <div className="travelTime mb-2">
                                <p> {ticket.travelTimeHour}  : {ticket.travelTimeMinute} </p>
                            </div>
                            <div className="travelDuration text-zinc-500 text-xs">
                                <div className="clockIcon">

                                </div>

                                <div className="duration">
                                    <p> {ticket.durationHour} h {ticket.durationMinute}mn </p>
                                </div>
                            </div>
                        </div>

                        <div className="third  text-green-700 bg-green-100 hover:bg-green-700 hover:text-green-100 ">
                            <p className="">{ticket.price}</p>

                        </div>


                    </div>

                    <div className="ticketPart2">
                        <div className="fourth absolute left-0 bottom-8 m-2 ">
                            <p> {ticket.departure} - {ticket.destination} </p>


                        </div>
                    </div>


                    {/*---------  Check Ticket Details----------- */}
                    <div className="col-span-1 row-span-1 border border-t-green-600 cursor-pointer hover:bg-green-200">
                        {/*  ----------Go To the a Single Ticket ------------- 
                                <Link href={`/tickets/${ticket.id}`}>

                                    </Link> 
                                */}

                        <div className="fifth absolute italic right-0 bottom-0 m-2 ">

                            check
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}
