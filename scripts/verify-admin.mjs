import assert from 'node:assert/strict'

const base = 'https://courses-platform-steel.vercel.app'
const password = process.env.CODERN_ADMIN_PASSWORD
assert.ok(password, 'Set CODERN_ADMIN_PASSWORD privately before live verification')
const anonymous = await fetch(base + '/admin', { redirect: 'manual' })
assert.equal(anonymous.status, 307)
assert.ok(anonymous.headers.get('location').endsWith('/admin/login'))
console.log('PASS: admin dashboard redirects anonymous visitors to login')
const page = await (await fetch(base + '/admin/login')).text()
assert.ok(!page.includes(password) && !page.includes('admin123'))
console.log('PASS: login page does not disclose the password')
const login = async (value, origin = base) => fetch(base + '/api/admin-session', {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@codern.io', password: value }),
})
assert.equal((await login('incorrect-password')).status, 401)
assert.equal((await login(password, 'https://unrelated.example')).status, 403)
const authenticated = await login(password)
assert.equal(authenticated.status, 200)
const rawCookie = authenticated.headers.get('set-cookie')
for (const attribute of ['HttpOnly', 'Secure', 'SameSite=strict']) assert.ok(rawCookie.includes(attribute), attribute)
const cookie = rawCookie.split(';')[0]
console.log('PASS: requested password accepted; wrong passwords and cross-origin requests rejected')
const dashboard = await fetch(base + '/admin', { redirect: 'manual', headers: { Cookie: cookie } })
assert.equal(dashboard.status, 200)
const html = await dashboard.text()
assert.ok(!html.includes(password))
const tampered = await fetch(base + '/admin', { redirect: 'manual', headers: { Cookie: cookie + 'tampered' } })
assert.equal(tampered.status, 307)
console.log('PASS: signed session opens the dashboard; tampered session is rejected')
const logout = await fetch(base + '/api/admin-session', { method: 'DELETE', headers: { Origin: base, Cookie: cookie } })
assert.equal(logout.status, 200)
assert.ok(logout.headers.get('set-cookie').includes('Max-Age=0'))
console.log('PASS: logout clears the cookie')
