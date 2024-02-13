import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import DeleteNews from "./[id]/DeleteNews";
import { data } from "autoprefixer";
import { FaEdit } from "react-icons/fa";


async function getNews() {
    const supabase = createServerComponentClient({ cookies })
    const { data, error } = await supabase
        .from('news')
        .select()

    if (error) {
        console.log("Error: ", error)
    }
    if (data) {
        return data
    }
}



export default async function NewsList({ params }) {

    const news = await getNews(params)
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    return (
        <div className=" ">

            {news.map((singleNews) => {

                const image = singleNews.image
                const { data: image_url } = supabase
                    .storage
                    .from('news/public')
                    .getPublicUrl(image);

                return <div key={singleNews.id} className="newsCard flex px-2 md:pb-1 md:px-2 border-b border-green-900 ">

                    <Link href={`/home/news/${singleNews.id}`} className="shadow-green-100 w-full">
                        <div style={{ display: 'flex' }}>
                            <div className="pt-1">
                                <img src={image_url.publicUrl}
                                    alt="news"
                                    width='250px'
                                    height='300px'
                                />
                            </div>

                            <div className="w-full px-2 ">
                                <div className="flex ">
                                    <div className="flex flex-col">
                                        <h4 className="font-semibold md:font-bold  text-lg  md:text-2xl">
                                            {singleNews.title}
                                        </h4>

                                        <p className="font-serif font-thin  md:text-lg md:hidden ">
                                            {singleNews.body.slice(0, 100)}...
                                        </p>
                                        <p className="font-serif font-thin  md:text-lg hidden md:block">
                                            {singleNews.body.slice(0, 250)}...
                                        </p>
                                    </div>



                                </div>


                                {/*
                                <p className="font-serif font-thin  md:text-lg md:hidden ">
                                    {singleNews.body.slice(0, 50)}...
                                </p>
                                <p className="font-serif font-thin  md:text-lg hidden md:block">
                                    {singleNews.body.slice(0, 250)}...
                                </p>
                                
                                */}
                            </div>

                        </div>
                        <span className="text-xs text-green-900"> {singleNews.release_date} </span>
                    </Link>

                    <div className="ml-auto w-8 md:w-44 flex flex-col">
                        <div className="editNews">
                            {data.session.user.email === singleNews.user_email && (
                                <Link href={`/home/news/${singleNews.id}/update`} className="flex">
                                    <button className="px-1 flex justify-center items-center bg-green-900  md:bg-green-500 text-green-100 rounded-sm pr-0 md:pr-2">
                                        <span className="hidden md:block"> Update News </span>
                                        <FaEdit className="ml-0 md:ml-4" />
                                    </button>
                                </Link>

                            )}

                        </div>

                        <div className="deleteNew mt-auto pb-1">
                            {data.session.user.email === singleNews.user_email && (
                                <DeleteNews id={singleNews.id} />
                            )}
                        </div>


                    </div>



                </div>


            })}
        </div>
    )
}
