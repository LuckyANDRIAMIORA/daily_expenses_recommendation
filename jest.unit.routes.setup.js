import { get_user_by_email, get_user_by_id, delete_user } from './pages/api/services/users.service'
import { create_expense, delete_expense } from './pages/api/services/expenses.service'

jest.mock('./pages/api/services/users.service', () => ({
    get_user_by_email: jest.fn(),
    get_user_by_id: jest.fn(),
    delete_user: jest.fn()

}));

jest.mock('./pages/api/services/expenses.service', () => ({
    create_expense: jest.fn(),
    delete_expense: jest.fn()
}));

beforeEach(() => {
    jest.resetAllMocks();
});