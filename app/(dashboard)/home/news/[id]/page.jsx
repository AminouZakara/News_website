import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }) {
    const supabase = createServerComponentClient({ cookies })
    const { data: singleNews } = await supabase.from('news')
        .select()
        .eq('id', params.id)
        .single()

    return {
        title: `News From | ${singleNews.title || 'News Not Found'} `
    }
}


async function getSingleNews(id) {
    //imitate delay
    // await new Promise(resolve => setTimeout(resolve, 3000))

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('news')
        .select()
        .eq('id', id)
        .single()


    if (!data) {
        notFound()
    }


    return data


}

{/*  ---------------   fetching NewsList again --------------  */ }
async function getNews() {

    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase.from('news')
        .select()

    if (error) {
        console.log("Error: ", error)
    }

    if (data) {
        return data
    }
}


export default async function NewsDetails({ params }) {

    const singleNews = await getSingleNews(params.id)

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()


    {/*  ---------- for NewsList Fetching ----------- */ }

    const getnewsagain = await getNews()
    const image = singleNews.image
    const { data: image_url } = supabase
        .storage
        .from('news/public')
        .getPublicUrl(image);

    return (
        <div className="md:h-screen  bg-green-300">
            <div className="bg-green-500 md:h-screen
               flex flex-col md:grid grid-rows-3 grid-cols-6 gap-1">

                {/*  ---------- Left Side News Details ----------- */}

                <div className="news overflow-auto py-1 row-span-3 bg-green-300 col-span-4">
                    <div className="news-body flex flex-col">
                        <div className="news-image w-auto bg-green-600 ">
                            <img src={image_url.publicUrl}
                                alt="news"
                                width='250px' height='300px'
                                className="w-full h-auto"
                            />
                        </div>

                        <div className="pl-2 body w-full sm:2/3">
                            <h1 className="text-green-950 text-lg font-bold ">
                                {singleNews.title}
                            </h1>
                            <p> {singleNews.body} </p>
                        </div>
                    </div>
                </div>

                {/*  ---------- Left Side All News  ----------- */}
                <div className="news md:h-screen bg-green-300 overflow-auto md:flex flex-col row-span-3 col-span-2">
                    <div className="sticky flex top-0 bg-green-300 px-2 py-3">
                        <h1 className="mr-auto  text-2xl">Recent News</h1>
                    </div>

                    {getnewsagain.map((news) => {
                        const imageN = news.image
                        const { data: image_url } = supabase
                            .storage
                            .from('news/public')
                            .getPublicUrl(imageN);

                        return <div key={news.id} className="flex flex-col py-1 
                            px-1 border-green-500 border-b-0 border-y-4">
                            <Link href={`/home/news/${news.id}`}>
                                <div className="bg-green-300 flex ">
                                    <img src={image_url.publicUrl}
                                        alt="news"
                                        width='100px' height='auto'
                                        className="w-1/3 h-auto md:h-24 "

                                    />
                                    <div className="pl-2 side-news flex flex-col">
                                        <h2 className="text-green-950 text-lg font-bold ">{news.title}</h2>

                                        <p> {news.body.slice(0, 110)} ... </p>


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
