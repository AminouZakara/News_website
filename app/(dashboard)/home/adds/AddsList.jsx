import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import DeleteAdd from "./[id]/DeleteAdd";


async function getAdds() {
    const supabase = createServerComponentClient({ cookies })
    const { data, error } = await supabase
        .from('adds')
        .select()

    if (error) {
        console.log("Error: ", error)
    }
    if (data) {
        return data;
    }
}


export default async function AddsList({ params }) {

    const adds = await getAdds({ params })
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    return (
        <div className="bg-green-200">

            {adds.map((singleAdd) => {

                const image = singleAdd.image
                const { data: image_url } = supabase
                    .storage
                    .from('adds/public')
                    .getPublicUrl(image);


                return <div key={singleAdd.id}>
                    <div className="AddCard flex px-2 md:pb-1 pt-1 md:px-2 border-b border-green-900 ">

                        <Link href={`/home/adds/${singleAdd.id}`} className="shadow-green-100 w-full">

                            <div style={{ display: 'flex' }}>
                                <div>
                                    <img
                                        src={image_url.publicUrl}
                                        alt="adds"
                                        width='250px'
                                        height='300px'
                                    />
                                </div>

                                <div className="body w-full p-1">
                                    <div className="flex">
                                        <h4 className=" text-ms font-semibold md:font-bold md:text-2xl">
                                            {singleAdd.title}
                                        </h4>
                                    </div>

                                    <p className="font-serif font-thin  md:text-lg md:hidden ">
                                        {singleAdd.body.slice(0, 100)}...
                                    </p>
                                    <p className="font-serif font-thin  md:text-lg hidden md:block">
                                        {singleAdd.body.slice(0, 250)}...
                                    </p>
                                </div>

                            </div>
                            <span className="text-xs text-green-900"> {singleAdd.release_date} </span>
                        </Link>

                        <div className="ml-auto w-12 md:w-44 flex flex-col">
                            <div className="editAdd">

                                {data.session.user.email === singleAdd.user_email && (
                                    <Link href={`/home/adds/${singleAdd.id}/update`} className="flex">
                                        <button className="px-1 flex justify-center items-center bg-green-900  md:bg-green-500 text-green-100 rounded-sm pr-0 md:pr-2">
                                            <span className="hidden md:block"> Update Add </span>
                                            <FaEdit className="ml-0 md:ml-4" />
                                        </button>
                                    </Link>

                                )}

                            </div>

                            <div className="deleteNew mt-auto pb-1">
                                {data.session.user.email === singleAdd.user_email && (
                                    <DeleteAdd id={singleAdd.id} />
                                )}
                            </div>


                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}
