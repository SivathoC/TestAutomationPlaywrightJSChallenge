import { test, expect } from '@playwright/test';
import {ApiClient} from'../../../main/api/services/ApiClient.js';
import { ApiClientTestData } from '../../../main/utils/apiClientTestData.js';
import { console } from 'inspector';

const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
require('ajv-formats')(ajv)

test.describe('Booking - Delete Booking', () => {

    let apiClient;
    let authResponse, createBookingResponse;
    let token, bookingid;
    let response;
    let jsonData;

    test.beforeEach(async ({ request }) => {
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

        response = await apiClient.deleteBooking(bookingid, token);
        console.log("Delete Response: ", response);

    });
    test('Status code is 201', () =>{
        expect(response.status()).toBe(201);        
    });
    test('Status code name has string Created', () =>{
        console.log(response);
        expect(response.statusText()).toBe('Created');
    });
    test('Content-Type header is present and response is in JSON format', () =>{
        console.log(response);
        const contentType = response.headers()['content-type']; 
    });
});