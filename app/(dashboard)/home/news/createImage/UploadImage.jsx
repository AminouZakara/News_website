"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


const UploadImage = () => {


    const handleUpload = async (e) => {

        const supabase = createClientComponentClient()
        let file = e.target.files[0];
        const fName = file?.name;

        const { data, error } = await supabase.storage
            .from("news")
            .upload("public/" + fName, file);


        if (data) {
            console.log(data);
        } else if (error) {
            console.log(error);
        }

    };



    return (
        <div>
            <div className="flex">
                <span>Upload Image</span>
                <input
                    type="file"
                    accept="image/*"
                    className="block w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    onChange={(e) => {
                        handleUpload(e);

                        // 👈 this will trigger when user selects the file.
                    }}
                />

            </div>
        </div>
    )
}
export default UploadImage;
