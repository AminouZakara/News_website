import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link";


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
                    <div className="add bg-green-300 flex px-2 md:pb-1 pt-1 md:px-2 border-b border-green-900">

                        <Link href={`/home/adds/${singleAdd.id}`} className="shadow-green-100">
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
                    </div>
                </div>
            })}


        </div>
    )
}
