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
    return data
}




export default async function AddsDetails({ params }) {
    const singleAdd = await getSingleAdd(params.id)

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    {/*  ---------- for NewsList Fetching ----------- */ }
    const getAddsAgain = await getAdds()



    return (
        <div className="h-screen bg-green-300">
            <div className="bg-green-500 h-screen
               flex flex-col md:grid grid-rows-3 grid-cols-6 gap-1">
                <div className="news h-screen px-2 overflow-auto row-span-3 bg-green-300 col-span-4">

                    <h2> {singleAdd.title} </h2>
                    <p> {singleAdd.body} </p>
                </div>

                <div className="news h-screen bg-green-300 overflow-auto hidden md:flex flex-col row-span-3 col-span-2">
                    <div className="sticky flex top-0 bg-green-300 p-2">
                        <h1 className="mr-auto text-2xl">Recent Adds</h1>

                        <Link href="/home/adds/createAdd">
                            <button className="bg-green-100 text-green-700 rounded-sm p-1">Add Add</button>
                        </Link>

                    </div>

                    {getAddsAgain.map((adds) => {
                        return <div key={adds.id} className="flex flex-col py-4 p-2 
                            px-2 border-green-500 border-b-0 border-y-4">
                            <Link href={`/home/adds/${adds.id}`}>
                                <div className="bg-green-300 ">
                                    <h2>{adds.title}</h2>

                                    <p> {adds.body.slice(0, 100)} ... </p>
                                </div>
                            </Link>



                        </div>
                    })}
                </div>


            </div>
        </div>
    )
}
