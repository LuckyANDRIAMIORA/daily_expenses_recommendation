import { act, fireEvent, render, screen } from '@testing-library/react';
import User_profile from '../../../components/user_profile';

describe('User_profile test', () => {
    test('should display user information', async () => {
        const user = {
            name: 'Lucky',
            email:'@gmail',
            image: 'https://avatars.githubusercontent.com/u/82311299?v=4'
        }
        const {getByText} = render(<User_profile user={user}/>)

        const email = getByText(user.email)
        const name = getByText(user.name)
        const img = document.querySelector("img");
        
        expect(email).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(img.src).toEqual(user.image)
    })
})