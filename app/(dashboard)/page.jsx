import Link from "next/link";
import AddsList from "./home/adds/AddsList";
import MainPage from "./home/MainPage/MainPage";
import NewsList from "./home/news/NewsList";


export default function Home() {
  return (
    <main className=" h-screen overflow-auto  w-full bg-green-500 ">

      {/*---------- 
      <div class="grid grid-rows-3 grid-flow-col gap-4">
  <div class="row-span-3 ...">01</div>
  <div class="col-span-2 ...">02</div>
  <div class="row-span-2 col-span-2 ...">03</div>
</div>---------- */}

      <div className="p-1 h-screen grid gap-1 grid-cols-5 md:grid-cols-4 w-full">


        {/*---------- Main Content ---------- */}
        <div className="mainContent sticky top-0 overflow-auto bg-green-300 
              row-start-2 row-span-3 col-span-5 
              md:row-span-4 md:col-span-3 
              justify-center
              ">

          <div className="bg-green-200 flex text-green-900 p-1 sticky top-0 md:p-1 recentNews">
            <h3 className=" italic text-green-900 text-2xl  ">Recent News</h3>

            <Link href="/home/news/createNews" className="flex ml-auto">
              <button className="px-1 bg-green-500 text-green-100 rounded-sm pr-2">
                Add News
              </button>
            </Link>

          </div>

          <NewsList />
        </div>

        {/*---------- Adds
        <div className="adds over p-2 pt-1 md:p-2 bg-green-300
             row-start-1 row-span-1 col-span-2
             md:row-span-1 md:col-span-1">
          <AddsList />
        </div>
        ---------- */}

        {/*---------- News ---------- */}
        <div className="news flex flex-col p-1 bg-green-200
              row-start-1 row-span-1 col-span-5 
              md:row-span-4 md:col-span-1 ">

          <AddsList />

        </div>


      </div>

    </main>
  )
}
