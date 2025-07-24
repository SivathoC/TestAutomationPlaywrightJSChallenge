import { test, expect } from '@playwright/test';
import {ApiClient} from'../../../main/api/services/ApiClient.js';
import { ApiClientTestData } from '../../../main/utils/apiClientTestData.js';

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

test.describe('Booking Create Booking', () => {
    let apiClient;
    let response;
    let jsonData;

    test.beforeEach(async ({ request }) => {
        apiClient = new ApiClient(request);
        response = await apiClient.createBooking(ApiClientTestData.createBookingData);
        jsonData = await response.json();
    });
    test('Status code is 200', async () => {
        expect(response.status()).toBe(200); 
    });
    test('Status code has string OK', async () => {
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
    });
    test('Validate booking response schema', async ({ request }) => { 
        const validate = ajv.compile(ApiClientTestData.fullBookingSchema);
        const valid = validate(jsonData);
        expect(response.ok()).toBeTruthy();
        if (!valid) {
            console.error('Schema validation errors:', validate.errors);
        }
        expect(valid).toBeTruthy();
    });
});