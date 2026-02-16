# Super Admin – Sign in & analytics

## Kaisay sign in karoon (Super Admin)

1. **Pehle koi user hona chahiye** (normal register + email verify).
2. Us user ko **super admin banao** – do tareeqe:

### Option A: Script (recommended)

Backend folder se run karo (`.env` mein `MONGODB_URI` set hona chahiye):

```bash
cd backend
node scripts/makeSuperAdmin.js your@email.com
```

Replace `your@email.com` with the email you use to sign in.

### Option B: MongoDB direct

MongoDB Compass ya shell se:

```javascript
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "superadmin" } }
)
```

3. **Sign in** karo app mein (Login page) usi email/password se.
4. Sidebar mein **"Admin"** link dikhega (sirf super admin ko).
5. **Admin** par click karo → **Super Admin Dashboard** open hoga.

---

## Dashboard kya dikhata hai

- **Total events, sessions, page views, mouse path** – sab analytics.
- **Page views by path** – kaunsi route kitni baar open hui.
- **Users with activity** – jo users **signed in** hokar app use karte hain, unka list + unka **user journey** (kahan kahan gaye).
- **All sessions** – har session (anonymous + signed-in) ki journey aur device info.

## Analytics ka flow

- **Bina sign in:** Events collect hoti hain (sessionId, device fingerprint). Session ki journey dikhti hai, user identity nahi.
- **Sign in ke baad:** Events ke sath **userId** bhi save hota hai. Dashboard mein "Users with activity" mein woh user aur uski puri activity dikhti hai.

Isi data se aap UX/UI aur backend improve kar sakte ho.
