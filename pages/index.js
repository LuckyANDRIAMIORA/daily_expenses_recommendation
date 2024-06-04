import { useSession, signOut } from 'next-auth/react';
import Login from '../components/login';

export default function Home() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
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