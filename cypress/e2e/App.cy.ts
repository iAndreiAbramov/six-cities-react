import { MOCK_USER_BACK } from '../../src/test-mocks/user-mocks';

describe('Application', () => {
    it('should render home page correctly', () => {
        cy.intercept('GET', 'six-cities/login', (req) => {
            req.reply((res) => {
                res.send({statusCode: 200, body: MOCK_USER_BACK})
            })
        })
        cy.visit('/');
    });
});
