import {test,expect} from '@playwright/test';

test.describe('Booking - GetBookingIds', () => {
    let response;
    test.beforeEach(async ({ request }) => {
        response = await request.get('https://restful-booker.herokuapp.com/booking');
    });

    test('Response status code is 200', async ({ request }) => {   
        // Check if the response status is 200 OK
        expect(response.status()).toBe(200);
    });
    test('Response status code name has string OK', async ({ request }) => {
        expect(response.statusText()).toBe('OK');
    });
    test('Content-Type header is present', async ({ request }) => {
        // Check if the response is in JSON format
        const contentType = response.headers()['content-type'];
    });
    test('Response is in JSON format', async ({ request }) => {
        expect(response.headers()['content-type']).toContain('application/json');
    });    
    test('Response body for each item in array', async ({ request }) => {
        const jsonData = await response.json();
        expect(Array.isArray(jsonData)).toBe(true);
        expect(jsonData.length).toBeGreaterThan(0);
         expect(typeof jsonData[0]).toBe('object');
        expect(jsonData[0]).toHaveProperty('bookingid');
        expect(typeof jsonData[0].bookingid).toBe('number');
                console.log('Response Headers:', response.headers());
        console.log(await response.json());
    });
});