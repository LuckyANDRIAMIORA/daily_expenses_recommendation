import { custum_error } from '../../../pages/api/services/custum_error';
import Register from '../../../pages/components/register';
import { render, screen, fireEvent, act } from '@testing-library/react';

global.fetch = jest.fn()

beforeEach(() => {
    global.fetch.mockRestore();
});

afterAll(() => {
    global.fetch.mockRestore();
});

describe('Register test ', () => {
    test('renders register form with email input, username, password, and a register button', () => {

        const { getByLabelText, getByText } = render(<Register />)

        const email_input = getByLabelText('Email');
        const username_input = getByLabelText('Username');
        const password_input = getByLabelText('Password');
        const register_button = getByText('Register')

        expect(email_input).toBeInTheDocument();
        expect(username_input).toBeInTheDocument();
        expect(password_input).toBeInTheDocument();
        expect(register_button).toBeInTheDocument();

    })

    test('should submit form and call fetch with correct parameters',async () => {
        const { getByLabelText, getByText } = render(<Register />)

        const email_input = getByLabelText('Email');
        const username_input = getByLabelText('Username');
        const password_input = getByLabelText('Password');
        const register_button = getByText('Register')

        const response = {
            ok: true
        }
        global.fetch.mockResolvedValue(response)

        await act(() => {
            fireEvent.change(email_input, { target: { value: 'lucky@gmail.com' } });
            fireEvent.change(username_input, { target: { value: 'Lucky' } });
            fireEvent.change(password_input, { target: { value: '1234' } });
            fireEvent.click(register_button);
        })

        expect(global.fetch).toHaveBeenCalledWith('../api/routes/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_email: 'lucky@gmail.com',
                user_name: 'Lucky',
                user_password: '1234'
            }),
        })
    })

    test('should submit form and call fetch with incorrect parameters and display error message', async () => {
        const { getByLabelText, getByText } = render(<Register />)

        const email_input = getByLabelText('Email');
        const username_input = getByLabelText('Username');
        const password_input = getByLabelText('Password');
        const register_button = getByText('Register')

        const response = {
            ok: false,
            text: jest.fn().mockResolvedValue('Email already in use!') 
        };

        global.fetch.mockResolvedValue(response)

        await act(() => {
            fireEvent.change(email_input, { target: { value: 'lucky@gmail.com' } });
            fireEvent.change(username_input, { target: { value: 'Lucky' } });
            fireEvent.change(password_input, { target: { value: '1234' } });
            fireEvent.click(register_button);
        });

        expect(global.fetch).toHaveBeenCalledWith('../api/routes/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_email: 'lucky@gmail.com',
                user_name: 'Lucky',
                user_password: '1234'
            }),
        })

        const error_message = document.getElementById('error_message');
        expect(error_message).toHaveTextContent('Email already in use!')

    })

})