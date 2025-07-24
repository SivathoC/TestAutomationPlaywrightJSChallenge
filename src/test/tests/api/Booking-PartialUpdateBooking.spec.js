import {test,expect} from '@playwright/test';
import {ApiClient} from'../../../main/api/services/ApiClient.js';
import { ApiClientTestData } from '../../../main/utils/apiClientTestData.js';

const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
require('ajv-formats')(ajv)


let response;
let jsonData;
test.describe('Booking - Partial Updated Booking', () => {
    test.beforeEach(async ({ request }) => {    
        let apiClient;
        let authResponse, createBookingResponse;
        let token, bookingid;

        apiClient = new ApiClient(request);
        authResponse = await apiClient.authenticate(
            ApiClientTestData.validCredentials.username,
            ApiClientTestData.validCredentials.password
        );
        const jsonAuthData = await authResponse.json();
        token =jsonAuthData.token;
        
        createBookingResponse = await apiClient.createBooking(ApiClientTestData.createBookingData);
        const jsonCreateBookingData = await createBookingResponse.json();
        bookingid = jsonCreateBookingData.bookingid;

        response = await apiClient.partialUpdateBooking(
            bookingid, 
            token, 
            ApiClientTestData.partialUpdateData
        );
        jsonData = await response.json();

    });
    test('Response status is 200 OK',()=> {
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');
       console.log('Response Headers:', response.headers());
    });
    test('Content-Type header is present and response is in json',()=> {
      const contentType = response.headers()['content-type'];
      expect(contentType).toContain('application/json');
    });
    test('Response body has the required properties',async()=> {
      const jsonData = await response.json();

      expect(jsonData).toHaveProperty('firstname');
      expect(typeof jsonData.firstname).toBe('string');

      expect(jsonData).toHaveProperty('lastname');
      expect(typeof jsonData.lastname).toBe('string');

      expect(jsonData).toHaveProperty('totalprice');
      expect(typeof jsonData.totalprice).toBe('number');

      expect(jsonData).toHaveProperty('depositpaid');
      expect(typeof jsonData.depositpaid).toBe('boolean');

      const bookingdates = jsonData.bookingdates;
      expect(jsonData).toHaveProperty('bookingdates');
      expect(typeof bookingdates).toBe('object');

      expect(bookingdates).toHaveProperty('checkin');
      expect(typeof bookingdates.checkin).toBe('string');

      expect(bookingdates).toHaveProperty('checkout');
      expect(typeof bookingdates.checkout).toBe('string');

      expect(jsonData).toHaveProperty('additionalneeds');
      expect(typeof jsonData.additionalneeds).toBe('string');
    });
    test('Valid Booking Partial Update Booking JSON schema', async () => {
        const validate = ajv.compile(ApiClientTestData.bookingSchema);
        const valid = validate(jsonData);

        expect(response.ok()).toBeTruthy();   
        if (!valid) {
          console.error('Schema validation errors:', validate.errors);
        }
        expect(valid).toBeTruthy();
    });
});