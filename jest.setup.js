import '@testing-library/jest-dom'

import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset } from 'jest-mock-extended';

import prisma from './prisma/prisma_client'

jest.mock('./prisma/prisma_client', () => ({
    __esModule: true,
    default: mockDeep(PrismaClient),
}));

beforeEach(() => {
    mockReset(prisma);
});
