import SubmitButton from "@/app/components/SubmitButton";
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

async function getSingleTicket(id) {
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

export default async function UpdateTicket({ params }) {
    const singleTicket = await getSingleTicket(params.id)

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    async function updateTicket(formData) {
        "use server"
        const singleTicket1 = Object.fromEntries(formData)

        const supabase = createServerActionClient({ cookies })
        const { data: { session } } = await supabase.auth.getSession()

        const { data, error } = await supabase
            .from('tickets')
            .update({
                cName: singleTicket1.cName,
                seatType: singleTicket1.seatType,
                travelTimeHour: singleTicket1.travelTimeHour,
                travelTimeMinute: singleTicket1.travelTimeMinute,
                durationHour: singleTicket1.durationHour,
                durationMinute: singleTicket1.durationMinute,
                price: singleTicket1.price,
                departure: singleTicket1.departure,
                destination: singleTicket1.destination,
                user_email: session.user.email
            })
            .eq(
                "id", singleTicket.id)

            .select()
        if (data) {
            console.log(data)
        }
        if (error) {
            (`Failed to update ticket with id ${singleTicket?.id}`)
        }
        revalidatePath('/tickets')
        redirect('/tickets')
    }
    return (
        <div className=" h-screen flex justify-center bg-green-300 ">
            <div className="w-full flex flex-row justify-center">
                <div className="mt-4">
                    <h2>Update Form</h2>
                </div>

                <form action={updateTicket} className=" w-5/6 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
                    <label className="mt-4">
                        <span>Company Name:</span>
                        <input
                            type="text"
                            name="cName"
                            defaultValue={singleTicket?.cName}
                        />
                    </label>

                    <label>
                        <span>Seat Type:</span>
                        <input
                            type="number"
                            name="seatType"
                            min="1"
                            max="2"
                            defaultValue={singleTicket?.seatType}
                        />
                    </label>
                    <label className="flex">
                        <span>Travel Time:</span>
                        <input
                            type="number"
                            name="travelTimeHour"
                            min='00'
                            max='23'
                            defaultValue={singleTicket?.travelTimeHour}
                        />
                        <h3 className="mx-4">:</h3>
                        <input
                            type="number"
                            name="travelTimeMinute"
                            min='00'
                            max='59'
                            defaultValue={singleTicket?.travelTimeMinute}
                        />
                    </label>
                    <label className="flex">
                        <span>Travel Duration:</span>
                        <input
                            type="number"
                            name="durationHour"
                            min="00"
                            max="23"
                            defaultValue={singleTicket?.durationHour}
                        />
                        <h3 className="mx-4">hour(S)</h3>
                        <input
                            type="number"
                            name="durationMinute"
                            min='00'
                            max='59'
                            defaultValue={singleTicket?.durationMinute}
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
                            defaultValue={singleTicket?.price}
                        />
                    </label>

                    <label className="flex">
                        <span>Departure:</span>
                        <input
                            className="w-5/6"

                            type="text"
                            name="departure"
                            defaultValue={singleTicket?.departure}
                        />
                        <h3 className="mx-4">-</h3>

                        <input
                            className="w-5/6"

                            type="text"
                            name="destination"
                            defaultValue={singleTicket?.destination}
                        />
                    </label>

                    <div className="btn">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    )
}
