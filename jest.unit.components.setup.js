import { useSession, signIn, signOut } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn()
}));


beforeEach(() => {
    jest.resetAllMocks();
});