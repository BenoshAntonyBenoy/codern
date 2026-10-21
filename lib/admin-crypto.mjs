import { randomBytes, scrypt as scryptCallback, createHmac, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
const scrypt = promisify(scryptCallback)
export const TTL = 8 * 60 * 60
export const COOKIE = '__Host-codern-admin'

export async function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const digest = await scrypt(password, salt, 64)
  return `${salt}:${digest.toString('hex')}`
}

export async function verifyPassword(password, stored) {
  if (typeof password !== 'string' || password.length > 256 || !/^[a-f0-9]{32}:[a-f0-9]{128}$/.test(stored || '')) return false
  const [salt, hash] = stored.split(':')
  const digest = await scrypt(password, salt, 64)
  return timingSafeEqual(digest, Buffer.from(hash, 'hex'))
}

function signature(value, secret, hash) {
  return createHmac('sha256', `${secret}:${hash}`).update(value).digest('base64url')
}

export function createSession(secret, hash, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ expires: Math.floor(now / 1000) + TTL, nonce: randomBytes(16).toString('hex') })).toString('base64url')
  return `${payload}.${signature(payload, secret, hash)}`
}

export function validSession(token, secret, hash, now = Date.now()) {
  try {
    if (!secret || !hash || typeof token !== 'string' || token.length > 1024) return false
    const [payload, sig, extra] = token.split('.')
    if (extra || !payload || !sig) return false
    const expected = Buffer.from(signature(payload, secret, hash))
    const actual = Buffer.from(sig)
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString())
    const seconds = Math.floor(now / 1000)
    return Number.isInteger(value.expires) && value.expires > seconds && value.expires <= seconds + TTL
  } catch { return false }
}

export function readCookie(header = '') {
  return header.split(';').map((entry) => entry.trim()).find((entry) => entry.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1)
}
