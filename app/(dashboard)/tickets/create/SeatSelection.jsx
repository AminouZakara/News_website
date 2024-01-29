"use client"

import { useState } from "react";
import { GiSteeringWheel } from "react-icons/gi";


export default function SeatSelection() {
    const [seatNumber, setSeatNumber] = useState('')
    const [choseSeat, setChoseSeat] = useState(false)


    const selectSeat = (value) => {
        setSeatNumber((prevSeats) => prevSeats + ' ' + value)
        setChoseSeat(!choseSeat)
    }



    const seatNumbers = [
        '51', '52', '53', '54', '55',
        '61', '62', '63', '64', '65',
        '71', '72', '73', '74', '75',
    ];


    return (
        <div className="">
            <h3>Select Your Seat(s) </h3>

            <div className="seats flex justify-center pt-1 items-center ">
                <div className="selectseat w-full h-44  bg-orange-400 rounded-3xl rounded-r-xl border border-x-8 border-green-400 ">

                    <div className="seatNumbersBtn bg-orange-100 grid grid-cols-5 gap-1">
                        {seatNumbers.map((SingleSeat) => (
                            <button
                                key={SingleSeat}
                                className={` ${(choseSeat === true) ? 'bg-green-400 text-green-100' : 'bg-white text-gray-900'}`}
                                onClick={() => {
                                    selectSeat(SingleSeat)

                                }}

                            >
                                {SingleSeat}
                            </button>

                        ))}
                    </div>

                    <div className="flex justify-center">
                        <input
                            type="text"
                            className="bg-orange-200 rounded-md"
                            value={seatNumber}
                            readOnly
                        />
                    </div>




                </div>


            </div>

        </div>
    )
}
