````markdown
# Vue 3 Integration

Vue has excellent, native support for Web Components. You can listen to custom events using the standard `@` syntax and interact with the component using template refs.

**Note:** If you get a "Failed to resolve component" warning in your console, tell Vite/Vue to ignore the tag in `vite.config.js`:
`vue({ template: { compilerOptions: { isCustomElement: (tag) => tag === 'human-verify-captcha' } } })`

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" v-model="email" placeholder="Email" required />

    <human-verify-captcha
      ref="captchaComponent"
      @captcha-suspicious-activity="handleSuspicious"
    ></human-verify-captcha>

    <button type="submit">Sign Up</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import "human-verify-captcha";

const email = ref("");
const captchaComponent = ref(null);

const handleSuspicious = (event) => {
  console.warn("Suspicious activity logged. Attempts:", event.detail.attempts);
};

const handleSubmit = () => {
  if (!captchaComponent.value.isValid()) return;
  console.log("Form is valid. Token:", captchaComponent.value.token);
};
</script>
```
````
