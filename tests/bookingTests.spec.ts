import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import booking from '../test-data/booking.json';

describe('Tests for the booking endpoint', () => {

  test('T1_BOOKING_createBookingWithValidData_200', async ({ request }) => {
    const response = await request.post("/booking", {
      data: booking
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json()
    expect(responseBody.booking).toHaveProperty("firstname", booking.firstname);
    expect(responseBody.booking).toHaveProperty("lastname", "Tester");
    expect(responseBody.booking).toHaveProperty("totalprice", 78);
    expect(responseBody.booking).toHaveProperty("depositpaid", true);
  });

  test('T1_BOOKING_bookingsBetweenDates_200', async ({ request }) => {
    const response = await request.get("/booking");
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  })

  test('T1_BOOKING_getById_200', async ({ request }) => {
    const bookingId = 4;
    const response = await request.get("/booking/" + bookingId);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  })

  test('T1_BOOKING_getByFirstnameAndLastname_noDataFound204', async ({ request }) => {
    const response = await request.get('/booking/1', {
      params: {
        firstname: "COP_Ambassadeur",
        lastname: "Tester"
      },
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(204);
  });

  test('T1_BOOKING_updateOnlyFirstName_204', async ({ request }) => {
    const response = await request.patch('/booking', {
      params: {
        firstname: "COP_Ambassadeur"
      },
    });
    console.log(await response);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(204);
  });



})

