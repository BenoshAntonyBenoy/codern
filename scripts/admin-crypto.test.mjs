import test from 'node:test'
import assert from 'node:assert/strict'
import { hashPassword, verifyPassword, createSession, validSession, readCookie, COOKIE, TTL } from '../lib/admin-crypto.mjs'

test('password checks reject incorrect, malformed and oversized inputs', async () => {
  const stored = await hashPassword('synthetic-test-password')
  assert.equal(await verifyPassword('synthetic-test-password', stored), true)
  assert.equal(await verifyPassword('wrong', stored), false)
  assert.equal(await verifyPassword(null, stored), false)
  assert.equal(await verifyPassword('x'.repeat(257), stored), false)
  assert.equal(await verifyPassword('anything', 'malformed'), false)
})

test('sessions expire and reject tampering, a different key and changed credentials', () => {
  const now = 1700000000000
  const key = 'synthetic-session-key-for-tests-only'
  const token = createSession(key, 'synthetic-hash', now)
  assert.equal(validSession(token, key, 'synthetic-hash', now), true)
  assert.equal(validSession(token, key, 'synthetic-hash', now + TTL * 1000), false)
  assert.equal(validSession(token + 'x', key, 'synthetic-hash', now), false)
  assert.equal(validSession(token, 'different-key', 'synthetic-hash', now), false)
  assert.equal(validSession(token, key, 'changed-hash', now), false)
  for (const invalid of [null, '', 'garbage', token + '.extra', 'x'.repeat(1025)]) {
    assert.equal(validSession(invalid, key, 'synthetic-hash', now), false)
  }
})

test('cookie extraction matches the exact admin cookie name', () => {
  assert.equal(readCookie(`other=value; ${COOKIE}=signed-token; theme=dark`), 'signed-token')
  assert.equal(readCookie(`${COOKIE}-other=wrong`), undefined)
})
