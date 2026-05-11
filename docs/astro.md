````markdown
# Astro Integration

Astro is perfectly suited for Web Components. You handle the component logic entirely in a client-side script tag, meaning zero JS is sent to the browser unless necessary.

```astro
---
// This runs on the server. No JS is sent to the client here.
---

<form id="astro-form">
  <input type="email" placeholder="Email" required />

  <frontend-captcha site-key="pub_front_9988776655" id="my-captcha"></frontend-captcha>

  <button type="submit">Submit</button>
</form>

<!-- This script runs on the client -->
<script>
  // Import the library client-side
  import 'frontend-captcha';

  const form = document.getElementById("astro-form");
  const captcha = document.getElementById("my-captcha");

  captcha.addEventListener("captcha-suspicious-activity", (e) => {
    console.warn("Failed attempts:", e.detail.attempts);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await customElements.whenDefined("frontend-captcha");

    if (!captcha.isValid()) return;
    console.log("Success! Token:", captcha.token);
  });
</script>
```
````
