"use client"

import SubmitButton from "@/app/components/SubmitButton"
import addAdds from "../actions"

export default function AddForm() {
    return (
        <form action={addAdds} className="w-3/4 md:w-1/2">
            <label>
                <span className="text-xl font-serif">Title :</span>
                <input
                    className="text-xl w-80  font-serif mt-2 md:mt-0 px-2 py-1"
                    type="text"
                    name="title"
                    placeholder="Add Title"
                    required

                />
            </label>
            <label className="mt-12 flex flex-col md:flex-row ">
                <span className="text-xl font-serif">Body:</span>
                <textarea
                    className="text-lg font-serif px-2 py-1 w-8/9 md:w-5/6 h-60 mt-2 md:mt-0"
                    name="body"
                    placeholder="Add Content"
                    required

                />
            </label>

            <div className="btn">
                <SubmitButton />
            </div>
        </form>
    )
}
