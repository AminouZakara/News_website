import Link from "next/link";
import { Suspense } from "react";
import Loading from "../../Loading";
import AddsList from "../adds/AddsList";
import NewsList from "./NewsList";

export default function news() {
    return <div className="h-screen overflow-auto">
        <div className="bg-green-500 h-screen 
               flex flex-col md:grid grid-rows-3 grid-cols-6 gap-1">
            <div className="news overflow-auto row-span-3 bg-green-300 col-span-6">
                <div className="newsHead sticky top-0 p-2 bg-green-200 flex ">
                    <Link href="/home/news" className="mr-auto" >
                        <h2 className="text-green-900 font-serif text-2xl">Recent News</h2>
                    </Link>

                    <Link href="/home/news/createNews" className="flex">
                        <button className="px-1 bg-green-500 text-green-100 rounded-sm pr-2">
                            Add News
                        </button>
                    </Link>
                </div>

                <Suspense fallback={<Loading />}>
                    <NewsList />
                </Suspense>

            </div>
        </div>
    </div>
}
