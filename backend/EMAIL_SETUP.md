# Email (Gmail) setup for verification emails

The **535 Username and Password not accepted** error means Gmail is rejecting the login. Gmail does **not** allow your normal account password for SMTP anymore.

## Fix: Use an App Password

1. Turn on **2-Step Verification** for your Google account:  
   https://myaccount.google.com/security

2. Create an **App Password**:  
   https://myaccount.google.com/apppasswords  
   - Select "Mail" and your device, then Generate.
   - You get a **16-character password** (no spaces).

3. In backend `.env` set:
   ```env
   EMAIL_USER=your@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   ```
   Use the 16-character App Password as `EMAIL_PASS` (spaces optional).

4. Restart the backend server.

---

## Dev fallback (no email configured)

If `EMAIL_USER` / `EMAIL_PASS` are missing, or Gmail returns 535, the app **still completes registration** and prints the OTP in the **backend terminal**:

```
⚠️ Gmail SMTP failed (use App Password). Dev OTP for user@example.com : 123456
```

Use that OTP on the Verify Email page to continue.
