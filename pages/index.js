import { useSession, signOut } from 'next-auth/react';
import Login from '../components/login';
import User_profile from '../components/user_profile';
import Expenses_form from '../components/expenses_form';

export default function Home() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <div>
                    <User_profile user={session.user} />
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
                <div>
                    <Expenses_form id={session.user.id}/>
                </div>
            </>
        );
    }

    return (
        <>
            <Login />
        </>
    );
}