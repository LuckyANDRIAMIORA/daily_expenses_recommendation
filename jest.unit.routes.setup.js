import { get_user_by_email, get_user_by_id, delete_user } from './services/users.service'
import { create_expense, delete_expense } from './services/expenses.service'
import { recommendation } from './services/recommendation.service';

jest.mock('./services/users.service', () => ({
    get_user_by_email: jest.fn(),
    get_user_by_id: jest.fn(),
    delete_user: jest.fn()

}));

jest.mock('./services/expenses.service', () => ({
    create_expense: jest.fn(),
    delete_expense: jest.fn()
}));

jest.mock('./services/recommendation.service', () => ({
    recommendation: jest.fn()
}))

beforeEach(() => {
    jest.resetAllMocks();
});