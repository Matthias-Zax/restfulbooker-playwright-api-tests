import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import booking from '../test-data/booking.json';

describe('Simple Healthcheck Endpoints', () => {

  test('T1_HEALTHCHECK_200', async ({ request }) => {
    const response = await request.get('/ping');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  })

});

