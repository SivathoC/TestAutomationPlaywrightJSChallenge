import {test,expect} from '@playwright/test';
import { ApiClient } from '../../../main/api/services/ApiClient';
import { ApiClientTestData } from '../../../main/utils/apiClientTestData';

const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
require('ajv-formats')(ajv)
const firstname = 'Jim';
const lastname = 'Brown';
const checkin = '2018-01-01';
const checkon = '2018-01-01';

test.describe('Booking - Get All Booking', () => {
    let apiClient;
    let response;
    let jsonData;

    test.beforeEach(async ({ request }) => {
        apiClient = new ApiClient(request);
        response = await apiClient.getAllBooking();
        jsonData = await response.json();
    });

    test('Response status code is 200', async ({ request }) => {   
        expect(response.status()).toBe(200);
    });
    test('Response status code name has string OK', async ({ request }) => {
        expect(response.statusText()).toBe('OK');
    });
    test('Content-Type header is present', async ({ request }) => {
        const contentType = response.headers()['content-type'];
    });
    test('Response is in JSON format', async ({ request }) => {
        expect(response.headers()['content-type']).toContain('application/json');
    });    
    test('Response body for each item in array', async ({ request }) => {
        const validate = ajv.compile(ApiClientTestData.bookingIdsShema)
        const valid = validate(jsonData);
        expect(response.ok()).toBeTruthy();
        if (!valid) {
            console.error('Schema validation errors:', validate.errors);
        }
        expect(valid).toBeTruthy();
    });
});

test.describe('Booking - Get Booking By Firstname', () => {
    let apiClient;
    let response;
    let jsonData;
    test.beforeEach(async ({ request }) => {
        apiClient = new ApiClient(request);
        response = await apiClient.getBookingByFirtname(firstname);
        jsonData = await response.json();
    });

    test('Response status code is 200', async ({ request }) => {   
        expect(response.status()).toBe(200);
    });
    test('Response status code name has string OK', async ({ request }) => {
        expect(response.statusText()).toBe('OK');
    });
    test('Content-Type header is present', async ({ request }) => {
        const contentType = response.headers()['content-type'];
    });
    test('Response is in JSON format', async ({ request }) => {
        expect(response.headers()['content-type']).toContain('application/json');
    });    
    test('Response body for each item in array', async ({ request }) => {
        const validate = ajv.compile(ApiClientTestData.bookingIdsShema)
        const valid = validate(jsonData);
        expect(response.ok()).toBeTruthy();
        if (!valid) {
            console.error('Schema validation errors:', validate.errors);
        }
        expect(valid).toBeTruthy();
    });
});

test.describe('Booking - Get Booking By Lastname', () => {
    let apiClient;
    let response;
    let jsonData;

    test.beforeEach(async ({ request }) => {
        apiClient = new ApiClient(request);
        response = await apiClient.getBookingByLastname(lastname);
        jsonData = await response.json();
    });

    test('Response status code is 200', async ({ request }) => {   
        expect(response.status()).toBe(200);
    });
    test('Response status code name has string OK', async ({ request }) => {
        expect(response.statusText()).toBe('OK');
    });
    test('Content-Type header is present', async ({ request }) => {
        const contentType = response.headers()['content-type'];
    });
    test('Response is in JSON format', async ({ request }) => {
        expect(response.headers()['content-type']).toContain('application/json');
    });    
    test('Response body for each item in array', async ({ request }) => {
        const validate = ajv.compile(ApiClientTestData.bookingIdsShema)
        const valid = validate(jsonData);
        expect(response.ok()).toBeTruthy();
        if (!valid) {
            console.error('Schema validation errors:', validate.errors);
        }
        expect(valid).toBeTruthy();
    });
});

test.describe('Booking - Get Booking By Firstname And Lastname', () => {
    let apiClient;
    let response;
    let jsonData;
    test.beforeEach(async ({ request }) => {
        apiClient = new ApiClient(request);
        response = await apiClient.getBookingByFirstnameAndLastname(firstname, lastname);
        jsonData = await response.json();
    });
    test('Response status code is 200', async ({ request }) => {   
        expect(response.status()).toBe(200);
    });
    test('Response status code name has string OK', async ({ request }) => {
        expect(response.statusText()).toBe('OK');
    });
    test('Content-Type header is present', async ({ request }) => {
        const contentType = response.headers()['content-type'];
    });
    test('Response is in JSON format', async ({ request }) => {
        expect(response.headers()['content-type']).toContain('application/json');
    });    
    test('Response body for each item in array', async ({ request }) => {
        const validate = ajv.compile(ApiClientTestData.bookingIdsShema)
        const valid = validate(jsonData);
        expect(response.ok()).toBeTruthy();
        if (!valid) {
            console.error('Schema validation errors:', validate.errors);
        }
        expect(valid).toBeTruthy();
    });
});

test.describe('Booking - Get Booking By Checkin', () => {
    let apiClient;
    let response;
    let jsonData;
    test.beforeEach(async ({ request }) => {
        apiClient = new ApiClient(request);
        response = await apiClient.getBookingByCheckin(checkin);
        jsonData = await response.json();
    });
    test('Response status code is 200', async ({ request }) => {   
        // Check if the response status is 200 OK
        expect(response.status()).toBe(200);
    });
    test('Response status code name has string OK', async ({ request }) => {
        expect(response.statusText()).toBe('OK');
    });
    test('Content-Type header is present', async ({ request }) => {
        const contentType = response.headers()['content-type'];
    });
    test('Response is in JSON format', async ({ request }) => {
        expect(response.headers()['content-type']).toContain('application/json');
    });    
    test('Response body for each item in array', async ({ request }) => {
        const validate = ajv.compile(ApiClientTestData.bookingIdsShema)
        const valid = validate(jsonData);
        expect(response.ok()).toBeTruthy();
        if (!valid) {
            console.error('Schema validation errors:', validate.errors);
        }
        expect(valid).toBeTruthy();
    });
});

test.describe('Booking - Get Booking By Checkout', () => {
    let apiClient;
    let response;
    let jsonData;
    test.beforeEach(async ({ request }) => {
        apiClient = new ApiClient(request);
        response = await apiClient.getBookingByCheckout(checkon);
        jsonData = await response.json();
    });
    test('Response status code is 200', async ({ request }) => {   
        expect(response.status()).toBe(200);
    });
    test('Response status code name has string OK', async ({ request }) => {
        expect(response.statusText()).toBe('OK');
    });
    test('Content-Type header is present', async ({ request }) => {
        const contentType = response.headers()['content-type'];
    });
    test('Response is in JSON format', async ({ request }) => {
        expect(response.headers()['content-type']).toContain('application/json');
    });    
    test('Response body for each item in array', async ({ request }) => {
        const validate = ajv.compile(ApiClientTestData.bookingIdsShema)
        const valid = validate(jsonData);
        expect(response.ok()).toBeTruthy();
        if (!valid) {
            console.error('Schema validation errors:', validate.errors);
        }
        expect(valid).toBeTruthy();
    });
});

test.describe('Booking - Get Booking By Checkin and Checkout', () => {
    let apiClient;
    let response;
    let jsonData;
    test.beforeEach(async ({ request }) => {
        apiClient = new ApiClient(request);
        response = await apiClient.getBookingByCheckinAndCheckout(checkin,  checkon);
        jsonData = await response.json();
    });
    test('Response status code is 200', async ({ request }) => {
        expect(response.status()).toBe(200);
    });
    test('Response status code name has string OK', async ({ request }) => {
        expect(response.statusText()).toBe('OK');
    });
    test('Content-Type header is present', async ({ request }) => {
        const contentType = response.headers()['content-type'];
    });
    test('Response is in JSON format', async ({ request }) => {
        expect(response.headers()['content-type']).toContain('application/json');
    });    
    test('Response body for each item in array', async ({ request }) => {
        const validate = ajv.compile(ApiClientTestData.bookingIdsShema)
        const valid = validate(jsonData);
        expect(response.ok()).toBeTruthy();
        if (!valid) {
            console.error('Schema validation errors:', validate.errors);
        }
        expect(valid).toBeTruthy();
    });
});