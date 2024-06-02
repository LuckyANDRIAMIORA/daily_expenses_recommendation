import { useState, useEffect } from 'react';

export default function Register() {

    const [email_input, set_email] = useState('')
    const [username_input, set_username] = useState('')
    const [password_input, set_password] = useState('')

    const register = async (e) => {
        e.preventDefault();
        const user = {
            user_email: email_input,
            user_name: username_input,
            user_password: password_input
        }
        fetch('api/routes/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
    }

    return (
        <>
            <div>
                <div>
                    <h1>User Registration</h1>
                    <form onSubmit={register}>
                        <label htmlFor="email">Email</label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            value={email_input}
                            onChange={(e) => { set_email(e.target.value) }}
                        /> <br />

                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={username_input}
                            onChange={(e) => { set_username(e.target.value) }}
                        /><br />
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password_input}
                            onChange={(e) => { set_password(e.target.value) }}
                        /><br />
                        <button type='submit'>Register</button>
                    </form>
                </div>
            </div>
        </>
    );
}