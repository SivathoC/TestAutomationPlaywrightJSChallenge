import {test,expect} from '@playwright/test';

test.describe('Auth CreateToken', () => {
    let response;
    test.beforeEach(async ({ request }) => {
        response = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
    });
    test('response status is 200 OK', async ({ request }) => {
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
    });
    test('Content-Type header is present', async ({ request }) => {
        // Check if the response is in JSON format
        const contentType = response.headers()['content-type'];
    });
    test('Response is in JSON format', async ({ request }) => {
        expect(response.headers()['content-type']).toContain('application/json');
    }); 
    test('Response body has required properties', async ({ request }) => {
        // Parse the response body as JSON
        const jsonData = await response.json();
        expect(jsonData).toHaveProperty('token');
        expect(typeof jsonData.token).toBe('string');
        console.log('Response Headers:', response.headers());
        console.log(jsonData);
    });
});