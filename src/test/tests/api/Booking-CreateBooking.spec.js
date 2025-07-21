import { test, expect } from '@playwright/test';
import { int } from 'zod';
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

test.describe('Booking Create Booking', () => {
    let response;
    test.beforeEach(async ({ request }) => {
        response = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                firstname : 'Jim',
                lastname : 'Brown',
                totalprice : 111,
                depositpaid : true,
                bookingdates : {
                    checkin : '2018-01-01',
                    checkout : '2019-01-01'
                },
                "additionalneeds" : "Breakfast"
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
        expect(jsonData).toHaveProperty('bookingid');
        expect(typeof jsonData.bookingid).toBe('number');

        expect(jsonData).toHaveProperty('booking');
        expect(typeof jsonData.booking).toBe('object');

        const booking = jsonData.booking;
        expect(booking).toHaveProperty('firstname');
        expect(typeof booking.firstname).toBe('string');

        expect(booking).toHaveProperty('lastname');
        expect(typeof booking.lastname).toBe('string');

        expect(booking).toHaveProperty('totalprice');
        expect(typeof booking.totalprice).toBe('number');

        expect(booking).toHaveProperty('depositpaid');
        expect(typeof booking.depositpaid).toBe('boolean');

        expect(booking).toHaveProperty('bookingdates');
        expect(typeof booking.bookingdates).toBe('object');

        expect(booking.bookingdates).toHaveProperty('checkin');
        expect(typeof booking.bookingdates.checkin).toBe('string');

        expect(booking.bookingdates).toHaveProperty('checkout');
        expect(typeof booking.bookingdates.checkout).toBe('string');

        expect(booking).toHaveProperty('additionalneeds');
        expect(typeof booking.additionalneeds).toBe('string');

        console.log('Response Headers:', response.headers());
        console.log(jsonData);
    });
    test('Validate booking response schema', async ({ request }) => { 
        expect(response.ok()).toBeTruthy();
        const jsonData = await response.json();
        const schema = {
            type: "object",
            properties: {
                bookingid: { type: "number" },
                booking: {
                    type: "object",
                    properties: {
                        firstname: { type: "string" },
                        lastname: { type: "string" },
                        totalprice: { type: "number" },
                        depositpaid: { type: "boolean" },
                        bookingdates: {
                            type: "object",
                            properties: {
                                checkin: { type: "string", format: "date" },
                                checkout: { type: "string", format: "date" }
                            },
                            required: ["checkin", "checkout"]
                        },
                        additionalneeds: { type: "string" }
                    },
                    required: [
                        "firstname",
                        "lastname",
                        "totalprice",
                        "depositpaid",
                        "bookingdates",
                        "additionalneeds"
                    ]
                }
            },
            required: ["bookingid", "booking"]
        };
        const validate = ajv.compile(schema);
        const valid = validate(jsonData);
        if (!valid) {
            console.error('Schema validation errors:', validate.errors);
        }
        expect(valid).toBeTruthy();

    });
});