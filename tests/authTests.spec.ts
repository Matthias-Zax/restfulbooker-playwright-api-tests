import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

const USER_ADMIN = 'admin';
const PASSWORD_ADMIN = 'password123';
const PASSWORD_ADMIN_INVALID = 'invalid123';

describe('Tests for the auth endpoint', () => {

  test('T1_LOGIN_withValidCredntials_200', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        "username": USER_ADMIN,
        "password": PASSWORD_ADMIN
      }

    });

    const data = await response.json();
    console.log(data);

    expect(data).toHaveProperty('token');
    expect(response.ok()).toBeTruthy();
  })

  test('T5_LOGIN_withInvalidCredntials_401', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        "username": USER_ADMIN,
        "password": PASSWORD_ADMIN_INVALID
      }

    });

    const data = await response.json();
    console.log(data);
    
    expect(response.status()).toBe(401);
  })
})

