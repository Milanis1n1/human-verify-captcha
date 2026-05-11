````markdown
# Next.js (App Router) Integration

Because Web Components rely on browser APIs like `window` and `customElements`, they **cannot** be rendered on the server. You must use the `"use client"` directive and import the library dynamically or inside a `useEffect` to prevent Server-Side Rendering (SSR) errors.

```jsx
"use client";

import React, { useRef, useEffect, useState } from "react";

export default function NextJsSignupForm() {
  const captchaRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Import only on the client side
    import("frontend-captcha").then(() => {
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isLoaded || !captchaRef.current) return;

    const el = captchaRef.current;
    const handleSuspicious = (e) =>
      console.warn("Failed attempts:", e.detail.attempts);
    el.addEventListener("captcha-suspicious-activity", handleSuspicious);

    return () =>
      el.removeEventListener("captcha-suspicious-activity", handleSuspicious);
  }, [isLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaRef.current?.isValid()) return;
    console.log("Token:", captchaRef.current.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required />

      {isLoaded && (
        <frontend-captcha ref={captchaRef}></frontend-captcha>
      )}

      <button type="submit">Sign Up</button>
    </form>
  );
}
```
````
