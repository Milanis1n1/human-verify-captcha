const express = require('express');
const app = express();
app.use(express.json());

// This stays securely on the server!
const EXPECTED_SITE_KEY = "pub_front_9988776655"; 
const TOKEN_EXPIRY_MS = 120000; // 2 minutes

app.post('/api/submit-form', (req, res) => {
  const { email, captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ error: "Captcha token is missing." });
  }

  try {
    // 1. Decode the Base64 token from the frontend
    const decodedPayload = Buffer.from(captchaToken, 'base64').toString('utf-8');
    const tokenData = JSON.parse(decodedPayload);

    // 2. Validate the Site Key
    if (tokenData.siteKey !== EXPECTED_SITE_KEY) {
      return res.status(403).json({ error: "Invalid Site Key." });
    }

    // 3. Validate the Timestamp (Prevent Replay Attacks)
    const timeElapsed = Date.now() - tokenData.timestamp;
    if (timeElapsed > TOKEN_EXPIRY_MS) {
      return res.status(403).json({ error: "Captcha token has expired." });
    }

    // 4. Success! Proceed with form submission
    console.log("Human verified successfully. Challenge solved:", tokenData.challenge);
    
    // Save to database, send email, etc...
    res.status(200).json({ message: "Registration successful!" });

  } catch (error) {
    // If JSON parsing or decoding fails, it's an invalid token
    return res.status(400).json({ error: "Malformed captcha token." });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));