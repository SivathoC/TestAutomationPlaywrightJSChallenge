const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });
require('ajv-formats')(ajv)

test.describe('Booking - Get Booking', () => {
  let response;
  const id = 68;

  test.beforeEach(async ({ request }) => {
    response = await request.get(`https://restful-booker.herokuapp.com/booking/${id}`);
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
  test('Validate booking JSON schema', async ({ request }) => {
  expect(response.ok()).toBeTruthy();

  const jsonData = await response.json();

const schema = {
  // "$schema": "http://json-schema.org/draft-04/schema#", ← REMOVE THIS LINE
  "type": "object",
  "properties": {
    "firstname": { "type": "string" },
    "lastname": { "type": "string" },
    "totalprice": { "type": "number" },
    "depositpaid": { "type": "boolean" },
    "bookingdates": {
      "type": "object",
      "properties": {
        "checkin": { "type": "string", "format": "date" },
        "checkout": { "type": "string", "format": "date" }
      },
      "required": ["checkin", "checkout"]
    },
    "additionalneeds": { "type": "string" }
  },
  "required": ["firstname", "lastname", "totalprice", "depositpaid", "bookingdates", "additionalneeds"]
};
  const validate = ajv.compile(schema);
  const valid = validate(jsonData);
  expect(valid).toBeTruthy();
  if (!valid) {
    console.error('Schema validation errors:', validate.errors);
}});

});
