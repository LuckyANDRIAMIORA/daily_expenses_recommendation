import { useSession} from 'next-auth/react';
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
                </div>
                <div>
                    <Expenses_form id={session.user.id} />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">Wellcome to daily expenses recommendation, Spend your money wisely</p>
                        <Login />
                    </div>
                </div>
            </div>
        </>
    );
}