import { test, expect } from '@playwright/test';

let response;
const id = 68;

test.describe('Booking - UpdatedBooking', () => {
    test.beforeEach(async ({ request }) => {
        const loginResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        const { token } = await loginResponse.json();
        response = await request.put(`https://restful-booker.herokuapp.com/booking/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        },
        data: {
            firstname: "James",
            lastname: "Brown",
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
              checkin: "2018-01-01",
              checkout: "2019-01-01"
            },
            additionalneeds: "Breakfast"
        }
    });
  });

  test('Status code is 200', async () => {
    expect(response.status()).toBe(200);
  });

  test('Status code name has string OK', async () => {
    expect(response.statusText()).toBe('OK');
  });

  test('Content-Type header is present and Response is in JSON format', async () => {
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('Response body has required properties', async () => {
    const jsonData = await response.json();

    expect(jsonData).toHaveProperty('firstname');
    expect(typeof jsonData.firstname).toBe('string');

    expect(jsonData).toHaveProperty('lastname');
    expect(typeof jsonData.lastname).toBe('string');

    expect(jsonData).toHaveProperty('totalprice');
    expect(typeof jsonData.totalprice).toBe('number');

    expect(jsonData).toHaveProperty('depositpaid');
    expect(typeof jsonData.depositpaid).toBe('boolean');

    expect(jsonData).toHaveProperty('bookingdates');
    expect(typeof jsonData.bookingdates).toBe('object');

    expect(jsonData.bookingdates).toHaveProperty('checkin');
    expect(typeof jsonData.bookingdates.checkin).toBe('string');

    expect(jsonData.bookingdates).toHaveProperty('checkout');
    expect(typeof jsonData.bookingdates.checkout).toBe('string');

    expect(jsonData).toHaveProperty('additionalneeds');
    expect(typeof jsonData.additionalneeds).toBe('string');

    console.log('Response Headers:', response.headers());
    console.log(jsonData);
  });
});
