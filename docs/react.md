# React Integration

React doesn't natively listen to custom DOM events emitted by Web Components, so you need to use a `useRef` to attach event listeners and call methods.

```jsx
import React, { useRef, useEffect } from "react";
import "human-verify-captcha"; // Registers the Web Component

export default function SignupForm() {
  const captchaRef = useRef(null);

  useEffect(() => {
    const el = captchaRef.current;
    if (!el) return;

    const handleSuspicious = (e) =>
      console.warn("Failed attempts:", e.detail.attempts);
    el.addEventListener("captcha-suspicious-activity", handleSuspicious);

    return () =>
      el.removeEventListener("captcha-suspicious-activity", handleSuspicious);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaRef.current?.isValid()) {
      return;
    }

    const token = captchaRef.current.token;
    console.log("Submitting with token:", token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required />
      <human-verify-captcha ref={captchaRef}></human-verify-captcha>
      <button type="submit">Sign Up</button>
    </form>
  );
}
```
