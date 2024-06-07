import { signIn } from 'next-auth/react';

export default function Login() {
    return (
        <>
            <button className="btn btn-outline" onClick={async () => await signIn()}>Sign in</button>
        </>
    );
}