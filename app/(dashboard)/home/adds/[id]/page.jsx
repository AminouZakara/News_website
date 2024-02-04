import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }) {
    const supabase = createServerComponentClient({ cookies })
    const { data: singleAdd } = await supabase.from('adds')
        .select()
        .eq('id', params.id)
        .single()

    return {
        title: `Adds From | ${singleAdd.title || 'Adds Not Found'} `
    }
}


async function getSingleAdd(id) {
    //imitate delay
    // await new Promise(resolve => setTimeout(resolve, 3000))

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('adds')
        .select()
        .eq('id', id)
        .single()


    if (!data) {
        notFound()
    }


    return data

}

{/*  ---------------   fetching NewsList again --------------  */ }

async function getAdds() {
    const supabase = createServerComponentClient({ cookies })
    const { data, error } = await supabase.from('adds')
        .select()

    if (error) {
        console.log(error)
    }
    if (data) {
        return data
    }
}




export default async function AddsDetails({ params }) {
    const singleAdd = await getSingleAdd(params.id)

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    {/*  ---------- for NewsList Fetching ----------- */ }
    const getAddsAgain = await getAdds()
    const image = singleAdd.image
    const { data: image_url } = supabase
        .storage
        .from('adds/public')
        .getPublicUrl(image);


    return (
        <div className="sm:h-screen bg-green-300">
            <div className="bg-green-500 sm:h-screen
               flex flex-col md:grid grid-rows-3 grid-cols-6 gap-1">

                {/*  ---------- Left Side News Details ----------- */}
                <div className="add px-2 overflow-auto row-span-3 bg-green-300 col-span-4">
                    <div className="add-body flex flex-col">
                        <div className="add-image w-auto bg-green-600 ">
                            <img src={image_url.publicUrl}
                                alt="add"
                                width='250px' height='300px'
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="pl-2 body w-full sm:2/3">

                            <h1 className="text-md text-green-950"> {singleAdd.title} </h1>
                            <p> {singleAdd.body} </p>
                        </div>
                    </div>
                </div>

                {/*  ---------- Right Side All News  ----------- */}
                <div className="adds h-screen bg-green-300 overflow-auto md:flex flex-col row-span-3 col-span-2">
                    <div className="sticky flex top-0 bg-green-300 px-2 py-3">
                        <h1 className="mr-auto text-2xl">Recent Adds</h1>
                    </div>

                    {getAddsAgain.map((adds) => {
                        const imageN = adds.image
                        const { data: image_url } = supabase
                            .storage
                            .from('adds/public')
                            .getPublicUrl(imageN);

                        return <div key={adds.id} className="flex flex-col py-2 
                            px-2 border-green-500 border-b-0 border-y-4">
                            <Link href={`/home/adds/${adds.id}`}>
                                <div className="bg-green-300 flex">
                                    <img src={image_url.publicUrl}
                                        alt="adds"
                                        width='100px' height='auto'
                                        className="w-1/3 h-auto md:h-24 "

                                    />
                                    <div className="pl-2 side-news flex flex-col">
                                        <h2>{adds.title}</h2>

                                        <p> {adds.body.slice(0, 100)} ... </p>
                                    </div>
                                </div>
                            </Link>



                        </div>
                    })}
                </div>


            </div>
        </div>
    )
}
