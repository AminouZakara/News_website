import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex justify-center bg-yellow-300 items-center">
            <h2 className="bg-green-100   rounded-md p-4">
                Oooops! <br /> <span className="text-yello-800">Ticket Not Found</span>  Please go back to the <span> <Link href="/tickets"><h1 className="text-green-500">Ticket Page</h1></Link> </span>
            </h2>
        </div>
    )
}
