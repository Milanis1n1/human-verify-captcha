````markdown
# Svelte Integration

Svelte treats Web Components almost identically to native HTML elements. You can bind to the component directly and listen to events natively.

```svelte
<script>
  import 'human-verify-captcha';

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

  <human-verify-captcha
    bind:this={captchaRef}
    on:captcha-suspicious-activity={handleSuspicious}
  ></human-verify-captcha>

  <button type="submit">Register</button>
</form>
```
````
