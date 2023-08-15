import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { UserButton, currentUser } from '@clerk/nextjs';

const Navbar = async () => {
    const user = await currentUser();
    return (
        <nav className="border-b border-gray-400/20">
            <div className="mx-auto max-w-8xl">
                <div className="relative flex items-center h-16 px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex ml-4 mr-6 lg:ml-0 gap-x-2">
                        <p className="text-4xl font-bold ">GET<span className="text-pink-500">GUD</span></p>
                    </Link>
                    <div className="flex items-center ml-auto space-x-4">
                        <Link href="/dashboard" className="flex justify-between px-2 text-pink-500 hover:underline underline-offset-2" >
                            DASHBOARD
                        </Link>
                        {user ?
                            <>
                                <UserButton afterSignOutUrl="/" />
                            </>
                            :
                            <>
                                <Link href="/sign-in" className="flex justify-between px-2 text-pink-500 hover:underline underline-offset-2" >
                                    LOGIN <ArrowUpRight size={16} className="inline-block ml-1" />
                                </Link>
                                <Link href="/sign-up"
                                    className="flex justify-between px-2 py-1 text-pink-500 border-2 border-pink-500 rounded-sm hover:bg-pink-500 hover:text-black" >
                                    SIGN UP <ArrowUpRight size={16} className="inline-block ml-1" />
                                </Link>
                            </>
                        }

                    </div>
                </div>
            </div>
        </nav>

    )
}
export default Navbar;