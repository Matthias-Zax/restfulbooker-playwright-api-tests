import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import booking from '../test-data/booking.json';

describe('Tests for the booking endpoint', () => {

  test('T1_BOOKING_CRUD_succefull', async ({ request }) => {
    let token: string = "";

    const responseLogin = await request.post('/auth', {
      data: {
        "username": "admin",
        "password": "password123"
      }
    });

    console.log(await responseLogin.json());
    expect(responseLogin.ok()).toBeTruthy();
    expect(responseLogin.status()).toBe(200);

    const responseLoginBody = await responseLogin.json();
    token = responseLoginBody.token;
    console.log("New Token is: " + token);

    // CREATE
    const responsePOST = await request.post("/booking", {
      data: booking
    });
    console.log(await responsePOST.json());
    expect(responsePOST.ok()).toBeTruthy();
    expect(responsePOST.status()).toBe(200);

    // get json property bookingid  
    const bookingId = await responsePOST.json().then(data => data.bookingid);

    // wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    // READ
    const responseGET = await request.get("/booking/" + bookingId);
    console.log(await responseGET.json());
    expect(responseGET.ok()).toBeTruthy();
    expect(responseGET.status()).toBe(200);

    // UPDATE
    const updatePUTRequest = await request.put('/booking/' + bookingId, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': "token=" + token,
      },
      data: {
        "firstname": "UpdateName",
        "lastname": "UpdateLastName",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2023-06-01",
          "checkout": "2023-06-15"
        },
        "additionalneeds": "Breakfast"
      }
    });
    console.log(await updatePUTRequest.body());
    console.log(await updatePUTRequest.json());
    expect(updatePUTRequest.ok()).toBeTruthy();
    expect(updatePUTRequest.status()).toBe(200);
    const updatedResponseBody = await updatePUTRequest.json()
    expect(updatedResponseBody).toHaveProperty("firstname", "UpdateName");
    expect(updatedResponseBody).toHaveProperty("lastname", "UpdateLastName");

    // DELETE
    const deleteRequest = await request.delete('/booking/' + bookingId, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': "token=" + token,
      }
    });

    expect(deleteRequest.status()).toEqual(201);
    expect(deleteRequest.statusText()).toBe('Created')
  })
})


