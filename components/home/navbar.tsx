import Link from 'next/link'
import Image from 'next/image'

import { auth } from '@clerk/nextjs'
// import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    const { userId } = auth()

    return (
        <nav
            className='flex items-center justify-between px-8 py-4 mx-auto space-x-4 text-gray-900 bg-white shadow-sm'
        >
            <div className="mr-auto">
                <Link href='/'>
                    <Image
                        src='/favicon.ico'
                        width={32}
                        height={32}
                        alt='logo'
                    />
                </Link>
            </div>
            <Link href='/timer' >Timer</Link>
            <Link href='/about' >About</Link>
            {
                userId ?
                    "Logout"
                    :
                    <Link href='/auth'><div>Account</div></Link>
            }
        </nav>

    )
}
export default Navbar;