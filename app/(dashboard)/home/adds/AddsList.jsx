import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Image from "next/image";
import Link from "next/link";
import DeleteNews from "../news/[id]/DeleteNews";
import Logo from "./logos/Logo_rimbo_1.jpeg"


async function getAdds() {
    const supabase = createServerComponentClient({ cookies })
    const { data, error } = await supabase.from('adds')
        .select()

    if (error) {
        console.log(error)
    }
    return data
}


export default async function AddsList() {

    const adds = await getAdds()
    return (
        <div className="flex md:grid scroll-smooth md:grid-cols-1 gap-3  overflow-auto ">

            {adds.map((singleAdd) => {
                return <div key={singleAdd.id}>
                    <div className="add rounded-md h-16 w-56 md:h-auto md:w-auto border-2 bg-green-200 text-green-950 border-green-500 p-2">
                        <Link href={`/home/adds/${singleAdd.id}`} className="shadow-green-100">



                            <div style={{ display: 'flex' }}>
                                <Image
                                    className=""
                                    src={Logo}
                                    alt="Rimbo logo"
                                    sizes="100vw"
                                    style={{
                                        width: '35%',
                                        height: '40%'
                                    }}
                                />

                                <div className="body w-full p-1">
                                    <div className="flex">
                                        <h4 className=" text-ms  md:text-md">
                                            {singleAdd.title}
                                        </h4>
                                    </div>

                                    <p className="font-serif hidden font-thin  md:text-lg md:block ">
                                        {singleAdd.body.slice(0, 30)}...
                                    </p>
                                    <p className="font-serif font-thin  md:text-lg hidden ">
                                        {singleAdd.body.slice(0, 250)}...
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
