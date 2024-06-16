import { signOut } from 'next-auth/react';

export default function User_profile({ user }) {
    return (
        <>
            <div className="card w-fit card-side bg-base-100 shadow-md p-1 flex">
                <div className="avatar">
                    <div className="w-28 rounded-full">
                        <img src={user.image} alt="Lucky's profile" />
                    </div>
                </div>
                <div className="card-body flex">
                    <h2 className="card-title text-base">{user.name}</h2>
                    <p className='text-sm'>{user.email}</p>
                </div>
            </div>
        </>
    );
}