import {test,expect} from '@playwright/test';
import {ApiClient} from'../../../main/api/services/ApiClient.js';
import { ApiClientTestData } from '../../../main/utils/apiClientTestData.js';

const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
require('ajv-formats')(ajv)

test.describe('Booking - Get Booking', () => {
  let apiClient;
  let response;
  const id = 15;
  let jsonData;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    response = await apiClient.getBooking(id);
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
  });
  test('Validate booking JSON schema', async ({ request }) => {
    const validate = ajv.compile(ApiClientTestData.bookingSchema);
    const valid = validate(jsonData);
    expect(response.ok()).toBeTruthy();
    if (!valid) {
      console.error('Schema validation errors:', validate.errors);
    }
    expect(valid).toBeTruthy();
  });
});
