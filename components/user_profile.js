import { signOut } from 'next-auth/react';

export default function User_profile({ user }) {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <p className="text-xl">daily expenses</p>
                </div>
                <div className="flex-none gap-2 text-right">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.image} alt={user.name} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><a onClick={() => signOut()}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}