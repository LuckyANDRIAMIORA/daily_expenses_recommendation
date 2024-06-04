import { useSession, signOut } from 'next-auth/react';
import Login from '../components/login';
import User_profile from '../components/user_profile';

export default function Home() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <User_profile user={session.user}/>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }

    return (
        <>
           <Login/>
        </>
    );
}