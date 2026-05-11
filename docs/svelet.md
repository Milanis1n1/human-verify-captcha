````markdown
# Svelte Integration

Svelte treats Web Components almost identically to native HTML elements. You can bind to the component directly and listen to events natively.

```svelte
<script>
  import 'frontend-captcha';

  let captchaRef;

  function handleSuspicious(event) {
    console.warn("Suspicious activity:", event.detail.attempts);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!captchaRef.isValid()) return;
    console.log("Verified! Submitting token:", captchaRef.token);
  }
</script>

<form on:submit={handleSubmit}>
  <input type="email" placeholder="Enter your email" required />

  <frontend-captcha
    site-key="pub_front_9988776655"
    bind:this={captchaRef}
    on:captcha-suspicious-activity={handleSuspicious}
  ></frontend-captcha>

  <button type="submit">Register</button>
</form>
```
````
