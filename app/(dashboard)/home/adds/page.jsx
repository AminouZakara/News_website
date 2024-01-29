import Link from 'next/link'
import AddsList from './AddsList'

export default function Adds() {
    return (
        <div className='h-screen'>
            <div className="bg-green-300 h-screen 
               flex flex-col md:grid grid-rows-3 grid-cols-6 gap-1">



                <div className="adds overflow-auto row-span-3 bg-green-500 col-span-6">

                    <div className="addsHead sticky top-0 p-2 bg-green-200 flex ">
                        <Link href="/home/adds" className="mr-auto" >
                            <h2 className="text-green-900 font-serif text-2xl">Recent Adds</h2>
                        </Link>

                        <Link href="/home/adds/createAdd" className="flex">
                            <button className="px-1 bg-green-500 text-green-100 rounded-sm pr-2">
                                Add A New Add
                            </button>
                        </Link>
                    </div>
                    <AddsList />

                </div>

            </div>
        </div>
    )
}
