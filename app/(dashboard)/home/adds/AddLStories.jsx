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


export default async function AddLStories({ params }) {
    const adds = await getAdds({ params })
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    return (
        <div className="flex md:grid scroll-smooth md:grid-cols-1 gap-1 md:gap-2 overflow-auto ">

            {adds.map((singleAdd) => {

                const image = singleAdd.image
                const { data: image_url } = supabase
                    .storage
                    .from('adds/public')
                    .getPublicUrl(image);


                return <div key={singleAdd.id}>
                    <div className="add rounded-md pl-1 flex items-center w-56 md:h-auto md:w-auto bg-yellow-100 h-20 text-green-950 ">

                        <Link href={`/home/adds/${singleAdd.id}`} className="">
                            <div style={{ display: 'flex' }}>
                                <div className="h-20 w-32">
                                    <img
                                        src={image_url.publicUrl}
                                        alt="adds"
                                        width='120px'
                                        height='12px'
                                        className=" md:w-56 h-full w-full "
                                    />
                                </div>


                                <div className="body w-full pl-1">
                                    <div className="flex">
                                        <h4 className="text-ms font-semibold md:font-bold  md:text-md ">
                                            {singleAdd.title}
                                        </h4>
                                    </div>
                                    <p className="hidden md:block font-serif font-thin text-md ">
                                        {singleAdd.body.slice(0, 30)}...
                                    </p>

                                </div>

                            </div>
                        </Link>
                    </div>
                </div>
            })}


        </div>
    )
}
