import { signIn } from 'next-auth/react';

export default function Login() {
    return (
        <>
            <h1>Spend your money wisely</h1>
            <button onClick={async () => await signIn()}>Sign in</button>
        </>
    );
}