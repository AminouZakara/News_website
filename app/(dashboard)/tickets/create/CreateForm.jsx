"use client"

import SubmitButton from "@/app/components/SubmitButton";
import { addTicket } from "../actions";



export default function CreateForm() {




    return (
        <form action={addTicket} className=" w-5/6 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
            <label className="mt-4">
                <span>Company Name:</span>
                <input
                    type="text"
                    name="cName"
                    placeholder="Enter Company Name"
                />
            </label>

            <label>
                <span>Seat Type:</span>
                <input
                    type="number"
                    name="seatType"
                    min="1"
                    max="2"
                    placeholder="1"
                />
            </label>
            <label className="flex">
                <span>Travel Time:</span>
                <input
                    type="number"
                    name="travelTimeHour"
                    min='00'
                    max='23'
                    placeholder="H"
                />
                <h3 className="mx-4">:</h3>
                <input
                    type="number"
                    name="travelTimeMinute"
                    min='00'
                    max='59'
                    placeholder="Mn"
                />
            </label>
            <label className="flex">
                <span>Travel Duration:</span>
                <input
                    type="number"
                    name="durationHour"
                    min="00"
                    max="23"
                    placeholder="0"
                />
                <h3 className="mx-4">hour(S)</h3>
                <input
                    type="number"
                    name="durationMinute"
                    min='00'
                    max='59'
                    placeholder="Mn"
                />
                <h3 className="">minute(S)</h3>

            </label>

            <label>
                <span>Price:</span>
                <input
                    type="number"
                    name="price"
                    min="1000"
                    max="1000000000"
                    step="1000"
                    placeholder="1000"
                />
            </label>

            <label className="flex">
                <span>Departure:</span>
                <input
                    className="w-5/6"

                    type="text"
                    name="departure"
                    placeholder="Departure"
                />
                <h3 className="mx-4">-</h3>

                <input
                    className="w-5/6"

                    type="text"
                    name="destination"
                    placeholder="Destination"
                />
            </label>

            <div className="btn">
                <SubmitButton />
            </div>
        </form>
    )
}
