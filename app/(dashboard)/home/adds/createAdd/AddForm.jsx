"use client"

import SubmitButton from "@/app/components/SubmitButton"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import addAdds from "../actions"

export default function AddForm() {
    const handleUpload = async (e) => {

        const supabase = createClientComponentClient()
        let file = e.target.files[0];
        const fName = file?.name;

        const { data, error } = await supabase.storage
            .from("adds")
            .upload("public/" + fName, file);

        if (data) {
            console.log(data);
        } else if (error) {
            console.log(error);
        }

    };


    return (
        <div className="h-screen flex justify-center w-5/6 sm:w-3/4 rounded-md bg-green-400 ">
            <div className="news-form w-full flex  flex-col">
                <div className="text-center pb-2">
                    <h2 className="text-orange-50"> Add Form</h2 >
                </div >
                <div className="pl-3 sm:pl-16">
                    <div className="flex flex-col md:flex-row">
                        <div className="image pb-2 sm:pb-0 pr-4">
                            <span className="">Upload Image:</span>
                        </div>
                        <input
                            type="file"
                            className="text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-64"

                            id="file_input"
                            onChange={(e) => {
                                handleUpload(e);
                                // 👈 this will trigger when user selects the file.
                            }}
                        />

                    </div>
                </div>
                <div className="flex justify-center ">
                    <form action={addAdds} className="mt-4 w-4/5 sm:w-2/3 border border-x-2 border-orange-400 ">

                        <label >
                            <span>Image:</span>
                            <input type="text"
                                name="image"
                                placeholder="image name"

                            />
                            <span className="pl-1 text-sm text-orange-400">write the image's name as it appears above</span>
                        </label>

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
                </div>

            </div>

        </div>
    )
}
