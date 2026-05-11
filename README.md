# Human Verify Captcha 🤖🛡️

A lightweight, framework-agnostic Web Component to prevent automated spam and verify human users. Built with Vanilla JavaScript, it uses an interactive Canvas-based text challenge and works seamlessly across **React, Vue, Angular, and Plain HTML**.

Zero dependencies. Highly portable. Easy to implement.

## Features

- **Framework Agnostic:** Works in any modern frontend stack using Web Components (`<human-verify-captcha>`).
- **Zero Dependencies:** Pure Vanilla JS, keeping your bundle size tiny.
- **Event-Driven:** Emits custom DOM events for easy integration with your state management.
- **Canvas Rendering:** Renders text onto an HTML canvas with visual noise to thwart simple DOM-scraping bots.
- **Built-in Security Logging:** Emits an event when suspicious activity (multiple failed attempts) is detected.

## Installation

Install via npm:

```bash
npm install human-verify-captcha
```

```bash
yarn add human-verify-captcha
```
