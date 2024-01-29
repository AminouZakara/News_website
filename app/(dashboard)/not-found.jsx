import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex justify-center bg-yellow-300 items-center">
            <h2 className="bg-green-100  rounded-md p-4">
                Page not found. Please go back to the <span> <Link href="/"><h1 className="text-green-500">homepage</h1></Link> </span>
            </h2>
        </div>
    )
}
