import { useSession } from 'next-auth/react';
import Login from '../components/login';
import User_profile from '../components/user_profile';
import Expenses_form from '../components/expenses_form';
import Header from '../components/header';
import List_expenses from '../components/list_expenses';
import { useState } from 'react';
import Recommendation_list from '../components/recommendation_list';

export default function Home() {
    const { data: session } = useSession();
    const [new_expense, set_new_expense] = useState({})
    const [expenses, set_expenses] = useState([]);

    if (session) {
        
        return (
            <>

                <div className='min-h-screen w-full flex flex-col flex-wrap'>
                    <div className='w-full'>
                        <Header />
                    </div>
                    <div className='flex flex-wrap flex-row justify-center'>
                        <div className='flex flex-wrap flex-row justify-center xl:flex-col'>
                            <div className='m-5'>
                                <User_profile user={session.user} />
                            </div>
                            <div className='m-5'>
                                <Expenses_form id={session.user.id}
                                    set_new_expense={set_new_expense}
                                />
                            </div>
                        </div>
                        <div className='flex flex-wrap flex-row justify-center'>
                            <div className='m-5'>
                                <List_expenses
                                    user_id={session.user.id}
                                    new_expense={new_expense}
                                    expenses={expenses}
                                    set_expenses={set_expenses}
                                />
                            </div>
                            <div className='m-5'>
                                <Recommendation_list expenses={expenses} />
                            </div>
                        </div>
                    </div>

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