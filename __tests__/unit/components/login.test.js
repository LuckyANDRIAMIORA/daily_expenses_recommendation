import Login from '../../../components/login';
import { signIn } from 'next-auth/react';
import { act, fireEvent, render, screen } from '@testing-library/react';

describe('Login test', () => {
    test('should call signIn', async () => {

        await act(async() => {
            render(<Login />)
        })

        const login_button = screen.getByText('Sign in');

        await act(()=>{
            fireEvent.click(login_button)
        })

        expect(signIn).toHaveBeenCalled()
    })
});