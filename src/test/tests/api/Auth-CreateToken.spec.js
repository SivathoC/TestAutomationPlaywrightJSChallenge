import {test,expect} from '@playwright/test';
import {ApiClient} from'../../../main/api/services/ApiClient.js';
import { ApiClientTestData } from '../../../main/utils/apiClientTestData.js';

const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
require('ajv-formats')(ajv)

test.describe('Auth CreateToken', () => {
    let apiClient;
    let authResponse;
    let jsonData;

    test.beforeEach(async ({ request }) => {
        apiClient = new ApiClient(request);
        authResponse = await apiClient.authenticate(
            ApiClientTestData.validCredentials.username,
            ApiClientTestData.validCredentials.password
        );
        jsonData = await authResponse.json();
    });
    test('response status is 200 OK', async () => {
        expect(authResponse.status()).toBe(200);        
    });
    test('Status code has string OK', async() => {
        expect(authResponse.statusText()).toBe('OK');
    })
    test('Content-Type header is present and response is in JSON format', async () => {
        const contentType = authResponse.headers()['content-type'];
        expect(contentType).toContain('application/json');
    });
    test('Response body has required properties', async ({ request }) => {
        expect(jsonData).toHaveProperty('token');
        expect(typeof jsonData.token).toBe('string');
    });
    test('Validate booking JSON schema', async() => {
    const validate = ajv.compile(ApiClientTestData.authSchema);
    const valid = validate(jsonData);
    expect(authResponse.ok()).toBeTruthy();
    if (!valid) {
      console.error('Schema validation errors:', validate.errors);
    }
    expect(valid).toBeTruthy();
    });
});