import { signOut } from 'next-auth/react';

export default function Header() {
    return (
        <>
            <div className="navbar bg-black text-white flex flex-wrap flex-row w-full">
                <div className="flex-1">
                    <p className="text-xl">daily expenses recommendation</p>
                </div>
                <div className="flex-none gap-2 text-right">
                    <button className="btn btn-link text-white text-sm" onClick={() => signOut()}>Logout</button>
                </div>
            </div>
        </>
    )
}