import { act, render, screen } from '@testing-library/react';
import User_profile from '../../../components/user_profile';

const user = {
    id: '1',
    name: 'Lucky',
    email: '@gmail',
    image: 'https://avatars.githubusercontent.com/u/82311299?v=4'
}

describe('User_profile test', () => {
    test('should display user information', async () => {
        await act(() => {
            render(<User_profile user={user} />)
        })

        const email = screen.getByText(user.email)
        const name = screen.getByText(user.name)
        const img = document.querySelector("img");

        expect(email).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(img.src).toEqual(user.image)
    })
})