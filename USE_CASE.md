# Framework Integration Guide (USE_CASES.md)

Because `human-verify-captcha` is built as a native Web Component (`<human-verify-captcha>`), it works seamlessly across any modern frontend framework.

Below are step-by-step implementation examples for the most popular frameworks.

---

## 🏗 Prerequisites (For all frameworks)

Before using the tag in any framework, you must import the package into your project's main entry file (e.g., `index.js`, `main.js`, `App.jsx`) so the browser registers the custom element.

```javascript
// Add this to your root entry file
import "human-verify-captcha";
```
