````markdown
# Astro Integration

Astro is perfectly suited for Web Components. You handle the component logic entirely in a client-side script tag, meaning zero JS is sent to the browser unless necessary.

```astro
---
// This runs on the server. No JS is sent to the client here.
---

<form id="astro-form">
  <input type="email" placeholder="Email" required />

  <human-verify-captcha id="my-captcha"></human-verify-captcha>

  <button type="submit">Submit</button>
</form>

<!-- This script runs on the client -->
<script>
  // Import the library client-side
  import 'human-verify-captcha';

  const form = document.getElementById("astro-form");
  const captcha = document.getElementById("my-captcha");

  captcha.addEventListener("captcha-suspicious-activity", (e) => {
    console.warn("Failed attempts:", e.detail.attempts);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await customElements.whenDefined("human-verify-captcha");

    if (!captcha.isValid()) return;
    console.log("Success! Token:", captcha.token);
  });
</script>
```
````
